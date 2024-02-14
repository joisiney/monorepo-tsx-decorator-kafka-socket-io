"use strict";
var _TransformExceptionService_stack;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformExceptionService = void 0;
const tslib_1 = require("tslib");
const Exceptions = tslib_1.__importStar(require("../../application/shared/exception"));
const classesToCheck = Object.values(Exceptions);
class TransformExceptionService {
    constructor(controllerName, url, method, error) {
        this.controllerName = controllerName;
        this.url = url;
        this.method = method;
        this.error = error;
        _TransformExceptionService_stack.set(this, {});
        if (this.controllerName !== 'ZodException') {
            tslib_1.__classPrivateFieldSet(this, _TransformExceptionService_stack, {
                controller: controllerName,
                ...this.stackErrorParse(this.error.stack ?? ''),
            }, "f");
        }
    }
    execute() {
        const { is, name, error } = this.isMyException();
        if (is) {
            return {
                code: error.code,
                status: 'error',
                name,
                message: error.message,
                method: this.method,
                url: this.url,
                stack: tslib_1.__classPrivateFieldGet(this, _TransformExceptionService_stack, "f"),
            };
        }
        if (error.message && error.message.length > 0) {
            tslib_1.__classPrivateFieldGet(this, _TransformExceptionService_stack, "f").sereverError = error.message;
        }
        else if (error.toString().length > 0) {
            tslib_1.__classPrivateFieldGet(this, _TransformExceptionService_stack, "f").sereverError = null;
        }
        return {
            code: 500,
            status: 'error',
            name: 'InternalException',
            message: 'Erro interno no servidor',
            stack: tslib_1.__classPrivateFieldGet(this, _TransformExceptionService_stack, "f"),
        };
    }
    stackErrorParse(stack) {
        const regex = /at (\w+)\.(\w+) \(([^:]+):(\d+):(\d+)\)/g;
        const matches = stack.matchAll(regex);
        const { value } = matches.next();
        const [, className, , rawFile, start, end] = value ?? [
            null,
            null,
            null,
            null,
            null,
            null,
        ];
        return {
            className,
            pathFile: rawFile?.split(/src|node_modules/)?.pop(),
            startLine: Number(start ?? -1),
            endLine: Number(end ?? -1),
        };
    }
    isMyException() {
        const [treatedError] = classesToCheck
            .map((myClasse) => {
            if (this.error instanceof myClasse) {
                return myClasse;
            }
            return null;
        })
            .filter(Boolean);
        return {
            is: Boolean(treatedError),
            name: treatedError && treatedError.name,
            error: this.error,
        };
    }
}
exports.TransformExceptionService = TransformExceptionService;
_TransformExceptionService_stack = new WeakMap();
