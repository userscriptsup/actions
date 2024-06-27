import * as Core from "@actions/core";
import * as Semver from "semver";

const input = Core.getInput("input");

let v;

if (input) {
	v = input;
} else if (process.env.GITHUB_REF_TYPE === "tag") {
	v = process.env.GITHUB_REF_NAME;
} else {
	Core.setFailed("Missing semver input, and the ref type is not tag.");
	process.exit(1);
	// v = "v1.0.0-beta.1"; // DEBUG
}

const semver = Semver.parse(v);
// console.debug(semver); // DEBUG

if (semver) {
	Core.setOutput("semver", semver.version);
	Core.setOutput("core", `${semver.major}.${semver.minor}.${semver.patch}`);
	Core.setOutput("major", semver.major);
	Core.setOutput("minor", semver.minor);
	Core.setOutput("patch", semver.patch);
	Core.setOutput("prerelease", semver.prerelease.join("."));
	Core.setOutput("build", semver.build.join("."));
	Core.setOutput("alpha", semver.prerelease.includes("alpha"));
	Core.setOutput("beta", semver.prerelease.includes("beta"));
} else {
	Core.setFailed(`Parsing failed: ${v}`);
}
