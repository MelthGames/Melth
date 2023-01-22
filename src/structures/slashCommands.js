module.exports = class SlashCommand {
    constructor(client, name, options = {}) {
        this.client = client;
        this.name = options.name || name;
        this.type = options.type || 1;
        this.description = options.description || null;
        this.options = options.options || []
        this.cooldown = "cooldown" in options ? options.cooldown : 5 || 5;
    } 
}