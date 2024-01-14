/*
 * template:
 * CmyCmd-I285229678443102218,532239959281893397-P268443648n-AmyArg1,myArg2
*/

const keywords = {
  C: "cmdName",
  I: "ids",
  P: "perms",
  A: "args"
};

module.exports = (data) => {
  if (typeof data == "string") {
    const dataChunks = data.split("-");
    if (dataChunks.length < 1) {
      throw new Error("customId.js: Invalid data string");
    }
    const obj = {};
    for (const chunk of dataChunks) {
      const key = chunk[0];
      if (!keywords[key]) {
        throw new Error(`customId.js: Invalid keyword ${key}`);
      }
      let value = chunk.slice(1);
      if (key !== "C") {
        value = value.split(",");
      }
      obj[keywords[key]] = value;
    }
    return obj;
  } else if (typeof data == "object") {
    const { cmdName, ids, perms, args } = data;
    let str = [];
    if (!cmdName) {
      throw new Error("customId.js: Missing cmdName");
    } else {
      str.push(`C${cmdName}`);
      if (ids) {
        str.push(`I${ids}`);
      }
      if (perms) {
        str.push(`P${perms}`);
      }
      if (args) {
        str.push(`A${args}`);
      }
    }
    return str.join("-");
  }
  throw new Error("customId.js: Invalid data type");
};
