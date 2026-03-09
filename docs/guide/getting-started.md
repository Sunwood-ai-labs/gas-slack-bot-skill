# Getting Started

## Prerequisites

- a logged-in Google account in the dedicated Chrome profile
- a logged-in Slack workspace session in the same Chrome profile
- Node.js available locally
- permission to create Apps Script projects and Slack Apps

## First Run

1. Launch or reuse the dedicated Chrome instance with `$logged-in-google-chrome`.
2. Scaffold the target bot repo with `scripts/scaffold_gas_slack_bot.ps1`.
3. Attach Playwright over CDP.
4. Create the Apps Script project and paste in the generated `Code.js`.
5. Create and install the Slack App.
6. Deploy the Web App and wire the `/exec` URL into Slack.
7. Invite the bot to the target channel and send a live test message.

