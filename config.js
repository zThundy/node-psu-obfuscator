var config = {
    'key': 'YOUR_KEY',
    'api_link': "https://api.psu.dev/obfuscate",
    'inputPath': "./input/",
    'outPath': "./output/",
    'options': {
        "DisableSuperOperators": false,
        "MaximumSecurityEnabled": false,
        "ControlFlowObfuscation": false,
        "ConstantEncryption": false,
        "EncryptAllStrings": false,
        "DisableAllMacros": false,
        "EnhancedOutput": false,
        "EnhancedConstantEncryption": false,
        "CompressedOutput": false,
        "PremiumFormat": false,
        "ByteCodeMode": "Default"
    }
}

module.exports = config