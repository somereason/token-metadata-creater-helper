const fs = require("fs");
const blake2 = require('blake2');
const cbor = require("cbor");
const CardanoWasm = require("@emurgo/cardano-serialization-lib-nodejs")

const secretKey = "FEEC145D9D14286782CAE828CBEDF195CBB04AC049655B37135CDDE980557800";
const pk = CardanoWasm.PrivateKey.from_normal_bytes(Buffer.from(secretKey, "hex"));


async function main() {
    const data = JSON.parse(fs.readFileSync("./be692739518128b32ad970206ea85994c2692c6e7c5c3f106c4fb6b3434854.json"));
    const subjectHash = cborAndHash(data.subject);
    for (var itemKey in data) {
        if (itemKey == "subject" || itemKey == "policy")
            continue;
        const item = data[itemKey];
        const propertyNameHash = cborAndHash(itemKey);
        const propertyValueHash = cborAndHash(item.value);
        const sequenceNumberHash = cborAndHash(item.sequenceNumber);
        const content2Hash = subjectHash + propertyNameHash + propertyValueHash + sequenceNumberHash;
        const finalHash = getHash(content2Hash);

        const siged = sign(finalHash);
        console.log("Target: ",item.signatures[0].signature);
        console.log("Signed: ",siged.signature);
        console.log("")
    }
}

function cborAndHash(content) {
    const cbHex = cbor.encode(content).toString('hex')
    return getHash(cbHex)
}
function getHash(content) {
    const h = blake2.createHash("blake2b", { digestLength: 32 });
    h.update(Buffer.from(content));
    return h.digest("hex")
}
function sign(content) {
    const signedBytes = pk.sign(Buffer.from(content, "hex")).to_bytes();
    const signed = Buffer.from(signedBytes).toString("hex");
    return {
        "publicKey": Buffer.from(pk.to_public().as_bytes()).toString('hex'),
        "signature": signed
    }
}
main();


