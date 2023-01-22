const fs = require('fs').promises
const path = require('path')
const Event = require("../structures/Event")
const SlashCommand = require("../structures/slashCommands")
// const fetch = require('node-fetch')

module.exports = class Util {
    constructor(client){
        this.client = client;
    }


    isClass(input) {
		return typeof input === 'function' &&
			typeof input.prototype === 'object' &&
			input.toString().substring(0, 5) === 'class';
	}

	trimArray(arr, maxLen = 10) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	}

	get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}

	removeDuplicates(arr) {
		return [...new Set(arr)];
	} 

	capitalise(string) {
		return string
			.split(" ")
			.map((str) => str.slice(0, 1).toUpperCase() + str.slice(1))
			.join(" ");
	}

	async *loadFiles(dir) {
		const files = await fs.readdir(dir);
		for (const file of files) {
			const pathToFile = path.join(dir, file);
			const isDirectory = (await fs.stat(pathToFile)).isDirectory();
			if (isDirectory) {
				yield* this.loadFiles(pathToFile);
			} else {
				yield pathToFile;
			}
		}
	}

    async loadInteractions(){
        for await (const slashFile of this.loadFiles(`${this.directory}/src/slashCommands`)){
			delete require.cache[slashFile];
			const { name } = path.parse(slashFile)
			const File = require(slashFile)
			if(!this.isClass(File)) throw new TypeError(`Command ${name} doesn't export a class.`);
			const command = new File(this.client, name.toLowerCase());
			if (!(command instanceof SlashCommand)) throw new TypeError(`Comando ${name} no está en slashCommands.`);
			this.client.slashCommands.set(command.name, command)
		}
    }

    async loadEvents() {
		for await (const eventFile of this.loadFiles(`${this.directory}/src/events`)) {
			delete require.cache[eventFile];
			const { name } = path.parse(eventFile);
			const File = require(eventFile);
			if (!this.isClass(File)) throw new TypeError(`Event ${name} doesn't export a class!`);
			const event = new File(this.client, name);
			if (!(event instanceof Event)) throw new TypeError(`Event ${name} doesn't belong in Events`);
			this.client.events.set(event.name, event);

			event.emitter[event.type](name, (...args) => event.run(...args));
		}
	}
}