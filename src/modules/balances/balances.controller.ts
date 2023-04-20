import { AuthGuard } from '@nestjs/passport';
import { Body, ClassSerializerInterceptor, Controller, Delete, FileTypeValidator, Get, Param, ParseFilePipe, Patch, Post, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { BalancesService } from "./balances.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { IBalanceCreateRequest } from "./interfaces";
import * as jwt from 'jsonwebtoken';
import AppError from 'src/errors/appError';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('balances')
export class BalancesController {
    constructor(private readonly balancesService: BalancesService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Request() request, @Body() data: IBalanceCreateRequest) {
        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const userId = String(decodedToken.sub)

        try {
            return this.balancesService.create(userId, data);
        } catch (error) {
            throw new AppError(error.message, 500)
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    @Post('/import')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './tmp',
                filename: (request, file, callback) => {
                    const filename = `${file.originalname}.csv`
                    return callback(null, filename)
                }
            }),
        }),
    )
    async import(
        @Request() request,
        @UploadedFile(
            new ParseFilePipe({
                validators: [new FileTypeValidator({ fileType: 'csv' })]
            })
        )
        file: Express.Multer.File
    ) {

        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const userId = String(decodedToken.sub)

        return this.balancesService.loadCSV(userId, file);
    }





    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Request() request) {
        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const userId = String(decodedToken.sub)
        try {
            return this.balancesService.findAll(userId);
        } catch (error) {
            throw new AppError(error.message, 500)
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOneById(@Request() request, @Param('id') id: string) {
        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const userId = String(decodedToken.sub)

        try {
            return this.balancesService.findOneById(userId, id);
        } catch (error) {
            throw new AppError(error.message, 500)
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    delete(@Param('id') id: string) {
        try {
            return this.balancesService.delete(id)
        } catch (error) {
            throw new AppError(error.message, 500)
        }
    }

}