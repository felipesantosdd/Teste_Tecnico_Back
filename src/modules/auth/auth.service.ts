import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validatedUser(userEmail: string, userPassword: string) {
        const user = await this.userService.findByEmail(userEmail);
        if (user) {
            const passwordMatch = await compare(userPassword, user.password);
            if (passwordMatch) {
                return { email: user.email, userId: user.id };
            }
        }

        return null;
    }

    async login({ email, password }) {
        const user = await this.userService.findByEmail(email);
        return {
            token: this.jwtService.sign({ userId: user.id, email }, { subject: user.id }),
        };
    }
}

