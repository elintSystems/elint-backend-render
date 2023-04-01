import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/provider/DateProvider/IDateProvider";
import  AppError  from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenResponse {
    refresh_token: string;
    token: string;
}

@injectable()
class RefreshTokenUseCase {

    constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<ITokenResponse> {
        const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload
        const user_id = sub

        //const { sub: user_id } = verify(token, auth.secret_refresh_token)

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
            user_id,
            token);

        if(!userToken) {
            throw new AppError("Refresh Token doesn't exists");
        }

        await this.usersTokensRepository.deleteById(userToken.id)

        //Gerar jsonwebtoken
        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: user_id,
            expiresIn: auth.expires_in_refresh_token
        })
        const refresh_token_expires_date = this.dayjsDateProvider.addDays(auth.expires_refresh_token)

        await this.usersTokensRepository.create({
            user_id: user_id,
            expires_date: refresh_token_expires_date,
            refresh_token: refresh_token
        })

        //Gerar jsonwebtoken
        const newToken = sign({}, auth.secret_token, {
            subject: user_id,
            expiresIn: auth.expires_in_token
        })

        return {
            refresh_token,
            token: newToken
        }
    }
}

export { RefreshTokenUseCase }