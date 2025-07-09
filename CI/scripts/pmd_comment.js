const pmdValidation = (pmdResults) => {
	try {
		const report = parseReport(pmdResults);
		const results = getResults(report);
		
		if (results?.length === 0) {
			return '## ✅ PMD Analysis: No issues found';
		}

		const violationsByFile = groupViolationsByFile(results);
		const rulesMap = extractRulesMap(report);
		
		// Generate the message
		let message = generateHeader(results);
		message += generateSummary(results);
		message += generateFileDetails(violationsByFile, rulesMap);

		return message;
	} catch (error) {
		console.log(error);
		return `## ⚠️ Error parsing PMD results: ${error.message}`;
	}
};

const parseReport = (pmdResults) => {
	return typeof pmdResults === 'string' ? JSON.parse(pmdResults) : pmdResults;
};

const getResults = (report) => {
	return report?.runs?.[0]?.results || [];
};

const groupViolationsByFile = (results) => {
	return results.reduce((output, pmdIssue) => {
		const location = pmdIssue.locations[0].physicalLocation;
		const filePath = location.artifactLocation.uri;

		if (!output[filePath]) {
			output[filePath] = [];
		}

		output[filePath].push({
			ruleId: pmdIssue.ruleId,
			message: pmdIssue.message.text,
			level: pmdIssue.level,
			location: {
				startLine: location.region.startLine,
				startColumn: location.region.startColumn,
				endLine: location.region.endLine,
				endColumn: location.region.endColumn
			}
		});
		return output;
	}, {});
};

const extractRulesMap = (report) => {
	const rulesMap = {};
	if (report?.runs?.[0]?.tool?.driver?.rules) {
		report.runs[0].tool.driver.rules.forEach(rule => {
			rulesMap[rule.id] = {
				description: rule.fullDescription ? rule.fullDescription.text.trim() : rule.shortDescription.text.trim(),
				ruleset: rule.properties && rule.properties.ruleset ? rule.properties.ruleset : '',
				level: rule.defaultConfiguration ? rule.defaultConfiguration.level : 'warning'
			};
		});
	}
	return rulesMap;
};

const generateHeader = (results) => {
	return `## ${results.length > 0 ? '⚠️' : '✅'} PMD Analysis: ${results.length} issue${results.length === 1 ? '' : 's'} found\n\n`;
};

const generateSummary = (results) => {
	let summary = '**Summary:**\n';
	summary += `- Total Issues: ${results.length}\n`;
	
	const warningCount = results.filter(r => r.level === 'warning').length;
	const errorCount = results.filter(r => r.level === 'error').length;
	const noteCount = results.filter(r => r.level !== 'warning' && r.level !== 'error').length;

	errorCount > 0 && (summary += `- Errors: ${errorCount}\n`);
	warningCount > 0 && (summary += `- Warnings: ${warningCount}\n`);
	noteCount > 0 && (summary += `- Notes: ${noteCount}\n`);
	
	return summary + '\n';
};

const generateFileDetails = (violationsByFile, rulesMap) => {
	let details = '';
	
	Object.keys(violationsByFile).forEach(filePath => {
		const violations = violationsByFile[filePath];
		details += `### 📄 ${filePath}\n\n`;
		details += violations.map(violation => generateViolationEntry(violation, rulesMap)).join('');
		details += '\n';
	});
	
	return details;
};

const generateViolationEntry = (violation, rulesMap) => {
	const ruleInfo = rulesMap[violation.ruleId] || {
		description: 'No description available',
		ruleset: 'Unknown',
		level: violation.level
	};

	const icon = getViolationIcon(violation.level);
	
	let entry = `${icon} **${violation.ruleId}** (${ruleInfo.ruleset}) - Line ${violation.location.startLine}:${violation.location.startColumn}\n`;
	entry += `> ${violation.message}\n\n`;

	// Add rule description if available and it's different from the message
	if (ruleInfo.description && ruleInfo.description !== violation.message) {
		entry += `<details><summary>Rule Details</summary>\n\n${ruleInfo.description}\n</details>\n\n`;
	}
	
	return entry;
};

const getViolationIcon = (level) => {
	return level === 'error' ? '🛑' : 
		level === 'warning' ? '⚠️' : 'ℹ️';
};

module.exports = pmdValidation;