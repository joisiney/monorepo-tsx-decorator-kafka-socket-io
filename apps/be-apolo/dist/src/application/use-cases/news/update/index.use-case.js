"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsUpdateByIdUseCase = void 0;
const tslib_1 = require("tslib");
const lib_hera_1 = require("@olympus/lib-hera");
let NewsUpdateByIdUseCase = class NewsUpdateByIdUseCase {
    constructor(newsRepository) {
        this.newsRepository = newsRepository;
    }
    async execute(props) {
        const news = await this.newsRepository.update(props);
        if (news.isError)
            return news.lanchError();
        return news.value;
    }
};
exports.NewsUpdateByIdUseCase = NewsUpdateByIdUseCase;
exports.NewsUpdateByIdUseCase = NewsUpdateByIdUseCase = tslib_1.__decorate([
    (0, lib_hera_1.Injectable)({ dep: ['NEWS_REPOSITORY'] }),
    tslib_1.__metadata("design:paramtypes", [Object])
], NewsUpdateByIdUseCase);
