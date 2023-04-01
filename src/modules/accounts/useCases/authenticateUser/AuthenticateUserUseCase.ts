import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import AppError  from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/provider/DateProvider/IDateProvider";

interface IRquest{
    email: string,
    password: string
}

interface IResponse{
    user: {
        name: string,
        email: string
    },
    token: string,
    refresh_token: string
}

@injectable()
class AuthenticateUserUseCase {
    
    constructor(@inject("UsersRepository")
        private userRepository: IUsersRepository,
        @inject("UsersTokensRepository") 
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dayjsDateProvider: IDateProvider) {}

    async execute({ email, password }: IRquest): Promise<IResponse> {
        //Usuario existe
        const user = await this.userRepository.findByEmail(email)

        const { expires_in_token, 
            secret_refresh_token, 
            secret_token, 
            expires_in_refresh_token,
            expires_refresh_token} = auth

        if(!user) {
            throw new AppError("Email or Password incorrect!")
        }
        //Senha esta correcta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new AppError("Email or Password incorrect!")
        }
        //Gerar jsonwebtoken
        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token
        })

        const refresh_token_expires_date = this.dayjsDateProvider.addDays(expires_refresh_token)
       // console.log("Days: "+refresh_token_expires_date)
       
        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        })

        await this.usersTokensRepository.create({
            user_id: user.id!,
            expires_date: refresh_token_expires_date,
            refresh_token: refresh_token
        })

        const tokenReturn: IResponse = {
            user: {
                name: user.name,
                email: user.email
            },
            token,
            refresh_token
        }

       return tokenReturn;
        // return {user: {name: user.name, email: user.email}, token, refresh_token}
    }
}

export { AuthenticateUserUseCase }