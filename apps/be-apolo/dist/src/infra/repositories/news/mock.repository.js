"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRepositoryMock = void 0;
const tslib_1 = require("tslib");
const domain_ceos_1 = require("@olympus/domain-ceos");
const lib_hera_1 = require("@olympus/lib-hera");
let NewsRepositoryMock = class NewsRepositoryMock {
    constructor() {
        this.mockNews = Array.from({ length: 4 }, (_, index) => {
            return new domain_ceos_1.NewsEntity({
                id: index.toString(),
                title: `Title ${index}`,
                description: `Description ${index}`,
                content: `Content ${index}`,
                thumbnail: `https://api.lorem.space/image/face?w=100&h=100&data=${index}`,
            });
        });
    }
    async findAll(props) {
        const paginationService = new lib_hera_1.PaginationEntity({
            page: props.page,
            take: props.take,
        });
        const data = this.mockNews.slice(paginationService.skip, paginationService.skip + paginationService.take);
        paginationService.data = data;
        paginationService.total = this.mockNews.length;
        return new lib_hera_1.Right(paginationService);
    }
    async findById(id) {
        const response = this.mockNews.find((news) => news.id === id);
        if (response) {
            return new lib_hera_1.Right(response);
        }
        return new lib_hera_1.Left(new lib_hera_1.NotFoundException('News not found'));
    }
    async create(news) {
        const hasNews = await this.has(news.id);
        if (hasNews) {
            return new lib_hera_1.Left(new lib_hera_1.NotFoundException('News already exists'));
        }
        const newNews = new domain_ceos_1.NewsEntity(news);
        this.mockNews.push(newNews);
        return new lib_hera_1.Right(newNews.id);
    }
    async has(id) {
        if (!id)
            return false;
        return this.mockNews.some((news) => news.id === id);
    }
    async update(news) {
        const index = this.mockNews.findIndex((item) => item.id === news.id);
        if (index === -1) {
            return new lib_hera_1.Left(new lib_hera_1.NotFoundException('News not found'));
        }
        const clone = { ...this.mockNews[index], ...news };
        this.mockNews[index] = new domain_ceos_1.NewsEntity(clone);
        return new lib_hera_1.Right(news.id);
    }
    async remove(id) {
        const index = this.mockNews.findIndex((item) => item.id === id);
        if (index === -1) {
            return new lib_hera_1.Left(new lib_hera_1.NotFoundException('News not found'));
        }
        this.mockNews.splice(index, 1);
        return new lib_hera_1.Right(true);
    }
};
exports.NewsRepositoryMock = NewsRepositoryMock;
exports.NewsRepositoryMock = NewsRepositoryMock = tslib_1.__decorate([
    (0, lib_hera_1.Injectable)({ name: 'NEWS_REPOSITORY' })
], NewsRepositoryMock);
