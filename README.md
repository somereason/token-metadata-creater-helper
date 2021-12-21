# TOKEN-METADATA-CREAT0R-HELPER

[token-metadata-creator](https://github.com/input-output-hk/offchain-metadata-tools/tree/master/token-metadata-creator) is a app which help you create token metadata file in json format.

But it has a limitation, it can only sign file with key file(such as privateKey.skey). So if you can not export your private key for some reason, you will not be able to sign your metadata file. 

This demo shows how the metadata json is hashed, and sign them to prove its validity.

Relevant discuss is [here](https://github.com/input-output-hk/offchain-metadata-tools/issues/43)