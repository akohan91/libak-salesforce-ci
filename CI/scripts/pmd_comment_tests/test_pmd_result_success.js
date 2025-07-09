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
        "results": [],
        "invocations": [{
            "executionSuccessful": true,
            "toolConfigurationNotifications": [],
            "toolExecutionNotifications": []
        }]
    }]
};

const fs = require('fs');
fs.writeFileSync(
    "CI/scripts/pmd_comment_tests/test_pmd_result_success.md",
    require('../pmd_comment.js')(deploymentResult)
);