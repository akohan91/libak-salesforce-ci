const deploymentResult = {
    "$schema": "https://json.schemastore.org/sarif-2.1.0.json",
    "version": "2.1.0",
    "runs": [{
        "tool": {
            "driver": {
                "name": "PMD",
                "version": "7.15.0",
                "informationUri": "https://docs.pmd-code.org/latest/",
                "rules": [{
                    "id": "EmptyStatementBlock",
                    "shortDescription": {
                        "text": "Avoid empty block statements."
                    },
                    "fullDescription": {
                        "text": "\n      Empty block statements serve no purpose and should be removed.\n    "
                    },
                    "helpUri": "https://docs.pmd-code.org/snapshot/pmd_rules_apex_errorprone.html#emptystatementblock",
                    "help": {
                        "text": "\n      Empty block statements serve no purpose and should be removed.\n    "
                    },
                    "properties": {
                        "ruleset": "Error Prone",
                        "priority": 3,
                        "tags": ["Error Prone"]
                    },
                    "defaultConfiguration": {
                        "level": "warning"
                    }
                }, {
                    "id": "UnusedLocalVariable",
                    "shortDescription": {
                        "text": "Variable 'processor' defined but not used"
                    },
                    "fullDescription": {
                        "text": "\nDetects when a local variable is declared and/or assigned but not used.\n        "
                    },
                    "helpUri": "https://docs.pmd-code.org/snapshot/pmd_rules_apex_bestpractices.html#unusedlocalvariable",
                    "help": {
                        "text": "\nDetects when a local variable is declared and/or assigned but not used.\n        "
                    },
                    "properties": {
                        "ruleset": "Best Practices",
                        "priority": 5,
                        "tags": ["Best Practices"]
                    },
                    "defaultConfiguration": {
                        "level": "note"
                    }
                }]
            }
        },
        "results": [{
            "ruleId": "EmptyStatementBlock",
            "ruleIndex": 0,
            "message": {
                "text": "Avoid empty block statements."
            },
            "level": "warning",
            "locations": [{
                "physicalLocation": {
                    "artifactLocation": {
                        "uri": "demo-app/main/default/classes/RestLogger.cls"
                    },
                    "region": {
                        "startLine": 2,
                        "startColumn": 2,
                        "endLine": 2,
                        "endColumn": 8
                    }
                }
            }]
        }, {
            "ruleId": "EmptyStatementBlock",
            "ruleIndex": 0,
            "message": {
                "text": "Avoid empty block statements."
            },
            "level": "warning",
            "locations": [{
                "physicalLocation": {
                    "artifactLocation": {
                        "uri": "demo-app/main/default/classes/RestLogger.cls"
                    },
                    "region": {
                        "startLine": 6,
                        "startColumn": 2,
                        "endLine": 6,
                        "endColumn": 8
                    }
                }
            }]
        }, {
            "ruleId": "EmptyStatementBlock",
            "ruleIndex": 0,
            "message": {
                "text": "Avoid empty block statements."
            },
            "level": "warning",
            "locations": [{
                "physicalLocation": {
                    "artifactLocation": {
                        "uri": "demo-app/main/default/classes/RestLogger.cls"
                    },
                    "region": {
                        "startLine": 10,
                        "startColumn": 2,
                        "endLine": 10,
                        "endColumn": 8
                    }
                }
            }]
        }, {
            "ruleId": "UnusedLocalVariable",
            "ruleIndex": 1,
            "message": {
                "text": "Variable 'processor' defined but not used"
            },
            "level": "note",
            "locations": [{
                "physicalLocation": {
                    "artifactLocation": {
                        "uri": "force-app/main/default/classes/tests/libak_TestRestRouter.cls"
                    },
                    "region": {
                        "startLine": 53,
                        "startColumn": 24,
                        "endLine": 57,
                        "endColumn": 5
                    }
                }
            }]
        }, {
            "ruleId": "EmptyStatementBlock",
            "ruleIndex": 0,
            "message": {
                "text": "Avoid empty block statements."
            },
            "level": "warning",
            "locations": [{
                "physicalLocation": {
                    "artifactLocation": {
                        "uri": "force-app/main/default/classes/tests/libak_TestRestRouter.cls"
                    },
                    "region": {
                        "startLine": 84,
                        "startColumn": 3,
                        "endLine": 84,
                        "endColumn": 9
                    }
                }
            }]
        }, {
            "ruleId": "EmptyStatementBlock",
            "ruleIndex": 0,
            "message": {
                "text": "Avoid empty block statements."
            },
            "level": "warning",
            "locations": [{
                "physicalLocation": {
                    "artifactLocation": {
                        "uri": "force-app/main/default/classes/tests/libak_TestRestRouter.cls"
                    },
                    "region": {
                        "startLine": 85,
                        "startColumn": 3,
                        "endLine": 85,
                        "endColumn": 9
                    }
                }
            }]
        }, {
            "ruleId": "EmptyStatementBlock",
            "ruleIndex": 0,
            "message": {
                "text": "Avoid empty block statements."
            },
            "level": "warning",
            "locations": [{
                "physicalLocation": {
                    "artifactLocation": {
                        "uri": "force-app/main/default/classes/tests/libak_TestRestRouter.cls"
                    },
                    "region": {
                        "startLine": 86,
                        "startColumn": 3,
                        "endLine": 86,
                        "endColumn": 9
                    }
                }
            }]
        }],
        "invocations": [{
            "executionSuccessful": true,
            "toolConfigurationNotifications": [],
            "toolExecutionNotifications": []
        }]
    }]
};

const fs = require('fs');
fs.writeFileSync(
    "CI/scripts/pmd_comment_tests/test_pmd_result_errors.md",
    require('../pmd_comment.js')(deploymentResult)
);