# Libak Salesforce CI

A collection of reusable GitHub Actions workflows and scripts for Salesforce CI/CD processes.

## Overview

This repository contains tools to help streamline your Salesforce CI/CD pipeline using GitHub Actions:

- **PMD Static Analysis**: Analyze your Salesforce code for quality issues
- **Deployment Validation**: Validate deployments against a target org
- **Formatted PR Comments**: Get readable, actionable feedback on pull requests

## Reusable Workflows

### PMD Static Analysis

This workflow runs PMD analysis on your Salesforce code and posts the results as a comment on your pull request.

```yaml
jobs:
  pmd:
    uses: akohan91/libak-salesforce-ci/.github/workflows/pmd_validation.yaml@main
    with:
      source-path: 'force-app/main/default' # Optional, defaults to this value
      ruleset-path: './libak-salesforce-ci/rulesets/apex/pmd_rule_set.xml' # Optional
```

#### Inputs

| Name           | Description                    | Required | Default                                                |
|----------------|--------------------------------|----------|--------------------------------------------------------|
| `source-path`  | Path to source code to analyze | No       | `force-app/main/default`                               |
| `ruleset-path` | Path to PMD ruleset XML        | No       | `./libak-salesforce-ci/rulesets/apex/pmd_rule_set.xml` |

### Deployment Validation

This workflow validates a deployment against a Salesforce org and posts the results as a comment on your pull request.

```yaml
jobs:
  validate:
    uses: akohan91/libak-salesforce-ci/.github/workflows/deployment_validation.yaml@main
    secrets:
      SFDX_AUTH_URL: ${{ secrets.SFDX_AUTH_URL }}
```

#### Requirements

- You need to set up a `SFDX_AUTH_URL` secret containing the SFDX auth URL for your org

## Scripts

### PMD Comment

The `CI/scripts/pmd_comment.js` script processes PMD results and generates a formatted comment for pull requests.

Example output:


## 💔 PMD Analysis: 7 issues found

**Summary:**
- Total Issues: 7
- Warnings: 6
- Notes: 1

<details><summary><strong>Issues list</strong></summary>
...
</details>

### Validation Comment

The `CI/scripts/validation_comment.js` script processes Salesforce deployment validation results and generates a formatted comment for pull requests.

Example output:


## 💚 Deployment Validation Results:
- **Status**: Success


Or for failures:


## 💔 Deployment Validation Results:
- **Status**: Failed
- <details><summary><strong>Test Failures</strong></summary></details>


## PMD Rule Set

The repository includes a comprehensive PMD rule set in `rulesets/apex/pmd_rule_set.xml` that covers:

- Best Practices
- Code Style
- Design
- Error Prone
- Performance
- Security

## Getting Started

1. Add this repository as a submodule to your Salesforce project:

```bash
git submodule add https://github.com/akohan91/libak-salesforce-ci.git
```

2. Create a GitHub Actions workflow file in your repository:

```yaml
name: Salesforce CI

permissions:
  contents: read
  pull-requests: write

on:
  pull_request:
    branches:
      - develop
    types:
      - opened
      - synchronize
      - reopened

jobs:
  pmd-analysis:
    uses: akohan91/libak-salesforce-ci/.github/workflows/pmd_validation.yaml@main

  validate-deployment:
    uses: akohan91/libak-salesforce-ci/.github/workflows/deployment_validation.yaml@main
    secrets:
      SFDX_AUTH_URL: ${{ secrets.SFDX_AUTH_URL }}
```

3. Set up your `SFDX_AUTH_URL` secret in your GitHub repository settings

## Running Tests

The repository includes test scripts for validating the comment generators:

```bash
# Run validation comment tests
bash CI/scripts/validation_comment_tests/validation_comment_test.sh

# Run PMD comment tests
bash CI/scripts/pmd_comment_tests/pmd_comment_tests.sh
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
