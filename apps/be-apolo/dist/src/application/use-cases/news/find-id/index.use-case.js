"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsFindByIdUseCase = void 0;
const tslib_1 = require("tslib");
const lib_hera_1 = require("@olympus/lib-hera");
let NewsFindByIdUseCase = class NewsFindByIdUseCase {
    constructor(newsRepository) {
        this.newsRepository = newsRepository;
    }
    async execute(props) {
        const news = await this.newsRepository.findById(props.id);
        if (news.isError)
            return news.lanchError();
        return news.value;
    }
};
exports.NewsFindByIdUseCase = NewsFindByIdUseCase;
exports.NewsFindByIdUseCase = NewsFindByIdUseCase = tslib_1.__decorate([
    (0, lib_hera_1.Injectable)({ dep: ['NEWS_REPOSITORY'] }),
    tslib_1.__metadata("design:paramtypes", [Object])
], NewsFindByIdUseCase);
