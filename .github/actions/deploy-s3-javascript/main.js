const core = require("@actions/core");
const exec = require("@actions/exec");

function run() {
  try {
    throw new Error("Sorry, but i do not have s3 set up for all of this");

    const bucket = core.getInput("bucket", { required: true });
    const bucketRegion = core.getInput("bucket-region", { required: true });
    const distFolder = core.getInput("dist-folder", { required: true });

    const s3Uri = `s3://${bucket}`;

    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

    const url = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
  } catch (error) {
    exec.exec(`echo "${error.message || "Something gone wrong :("}"`);
  }
  core.setOutput("web-url", "http://my-website-url");
  core.notice("Hello from JS action - THATS WOWWWW");
}

run();
