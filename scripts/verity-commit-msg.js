import { bgRed, cyan, green, red } from 'chalk'
const msgPath = process.env.GIT_PARAMS
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim()

const commitReg = /^(revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release|dep)(\(.+\))?: .{1, 50}/

if (!commitReg.test(msg)) {
  console.log()
  console.error(
    `  ${bgRed.white(' ERROR ')} ${red(`invalid commit message format.`)}\n\n` +
      red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`,
      ) +
      `    ${green(`feat(compiler): add 'comments' option`)}\n` +
      `    ${green(`fix(v-model): handle events on blur (close #28)`)}\n\n` +
      red(`  See .github/COMMIT_CONVENTION.md for more details.\n`) +
      red(
        `  You can also use ${cyan(
          `npm run commit`,
        )} to interactively generate a commit message.\n`,
      ),
  )
  process.exit(1)
}
