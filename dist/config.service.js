"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
// export interface LogOptions {
//     files: FileTransportOptions[];
//     console: boolean;
//     level: LogLevel;
//     default: boolean;
// }
// const DEFAULT_CONFIG = "default.yml";
// const LOCAL_CONFIG_PREFIX = "local-";
class ConfigService {
    get FORM_URL() {
        return config_1.default.get("FORM_URL");
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map