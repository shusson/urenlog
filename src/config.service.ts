import config from "config";

export class ConfigService {
    get FORM_URL(): string {
        return config.get("FORM_URL");
    }

    get HOURS(): string {
        return config.get("about.hours") || "8";
    }

    get NOTE(): string {
        return config.get("about.note") || "Worked on data-collection module";
    }
}
