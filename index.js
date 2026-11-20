#!/usr/bin/env node

import chalk from 'chalk';
import boxen from 'boxen';
import Table from 'cli-table3';

// Text Styles
const titleStyle = chalk.bold.hex('#60A5FA');
const subtitleStyle = chalk.italic.hex('#FF007F');
const labelStyle = chalk.bold.white;
const valueStyle = chalk.hex('#E2E8F0');
const linkStyle = chalk.underline.hex('#93C5FD');
const dateStyle = chalk.hex('#CBD5E1');
const descriptionStyle = chalk.hex('#CBD5E1');

const data = {
  name: titleStyle(' BEOMGYU CHOI '),
  handle: subtitleStyle('Software Engineer (Cloud / Full-Stack)'),
  tagline: chalk.white('\n"Buy and hold."'),

  work: labelStyle('Experience\n') +
        `  • ${valueStyle('Executive Organizer @ LIKELION JNU 14th')} ${dateStyle('(Feb 2026 - Present)')}\n` +
        `    ${descriptionStyle('Managing tech seminars and hackathons for the JNU chapter.')}\n` +
        `  • ${valueStyle('Undergraduate Researcher @ Intelligent Computing Lab')} ${dateStyle('(Mar 2025 - Feb 2026)')}\n` +
        `    ${descriptionStyle('Conducted research on NLP and LLM architectures.')}`,

  github: labelStyle('\nLinks\n') +
          labelStyle('    GitHub: ') +
          linkStyle('https://github.com/uncledrew-sr'),

  linkedin: labelStyle('  LinkedIn: ') +
            linkStyle('https://www.linkedin.com/in/beomgyu-choi-035263320/'),

  web: labelStyle(' Portfolio: ') +
       descriptionStyle('https://beomgyu-choi.dev (Coming soon)'),

  npx: chalk.inverse.bold.hex('#60A5FA')(' npx beom-gyu-choi '),

  contact: labelStyle('Contact\n') +
           labelStyle('  Personal: ') +
           linkStyle('bonggutravel@gmail.com') + '\n' +
           labelStyle('      Work: ') +
           linkStyle('fredb@stu.jejunu.ac.kr')
};

// Honors & Awards Table
const table = new Table({
  head: [
    chalk.hex('#60A5FA')('Date'),
    chalk.hex('#60A5FA')('Title / Event'),
    chalk.hex('#60A5FA')('Achievement'),
    chalk.hex('#60A5FA')('Field')
  ],
  colWidths: [14, 54, 22, 18],
  style: {
    head: [],
    border: ['white']
  }
});

table.push(
  [
    dateStyle('Aug 19, 2025'),
    valueStyle('In-Jeju Challenge'),
    chalk.yellow('🏆 Grand Prize'),
    valueStyle('Infra, BE')
  ],
  [
    dateStyle('Dec 04, 2025'),
    valueStyle('RISE Capstone Design Result-Presentation'),
    chalk.hex('#C0C0C0')('🥈 Excellence Prize'),
    valueStyle('NLP, T5')
  ],
  [
    dateStyle('Dec 18, 2025'),
    valueStyle('한국데이터사이언스학회 동계종합학술대회'),
    chalk.hex('#CD7F32')('🏅 Honorable Mention'),
    valueStyle('CV, Edge AI')
  ],
  [
    dateStyle('Feb 26, 2026'),
    valueStyle('ICAIIC 2026 (Tokyo, Japan)'),
    chalk.bold.hex('#A020F0')('🌐 Poster Present.'),
    valueStyle('NLP, T5')
  ]
);

// Output
const output = `
${data.name} / ${data.handle}
${data.tagline}

${data.work}

${labelStyle('Honors & Awards')}
${table.toString()}

${data.contact}

${data.github}
${data.linkedin}
${data.web}

${chalk.hex('#CBD5E1')('─────────────────────────────────────────────────────────────────────────────────────────')}
${chalk.hex('#CBD5E1')('  Type the command below anytime to view this card again:')}
  ${data.npx}
`;

// Box Settings
const options = {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  borderColor: '#60A5FA',
  backgroundColor: '#070B12'
};

console.log(boxen(output, options));
