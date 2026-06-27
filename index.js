#!/usr/bin/env node

import chalk from 'chalk';
import boxen from 'boxen';
import Table from 'cli-table3';

const titleStyle = chalk.bold.cyan;
const subtitleStyle = chalk.italic.hex('#FF007F');
const labelStyle = chalk.bold.white;
const valueStyle = chalk.gray;
const linkStyle = chalk.underline.hex('#00F0FF');
const dateStyle = chalk.dim.gray;

const data = {
  name: titleStyle(' BEOMGYU CHOI '),
  handle: subtitleStyle('Software Engineer (AI / Full-Stack)'),
  tagline: chalk.white('\n"Bridging the gap between LLMs and scalable web apps."'),
  
  work: labelStyle('Experience\n') + 
        `  • ${valueStyle('Executive Organizer @ LIKELION JNU 14th')} ${dateStyle('(Feb 2026 - Present)')}\n` +
        `    ${chalk.dim('Managing tech seminars and hackathons for the JNU chapter.')}\n` +
        `  • ${valueStyle('Undergraduate Researcher @ Intelligent Computing Lab')} ${dateStyle('(Mar 2025 - Feb 2026)')}\n` +
        `    ${chalk.dim('Conducted research on NLP and LLM architectures.')}`,
  
  github: labelStyle('\nLinks\n') + labelStyle('    GitHub: ') + linkStyle('https://github.com/uncledrew-sr'),
  linkedin: labelStyle('  LinkedIn: ') + linkStyle('https://www.linkedin.com/in/beomgyu-choi-035263320/'),
  web: labelStyle(' Portfolio: ') + chalk.dim('https://beomgyu-choi.dev (Coming soon)'),
  
  npx: chalk.inverse.bold.cyan(' npx beom-gyu-choi '),
  
  contact: labelStyle('Contact\n') +
            labelStyle('  Personal: ') + linkStyle('bonggutravel@gmail.com') + '\n' +
            labelStyle('      Work: ') + linkStyle('fredb@stu.jejunu.ac.kr')
};

const table = new Table({
  head: [chalk.cyan('Date'), chalk.cyan('Title / Event'), chalk.cyan('Achievement'), chalk.cyan('Field')],
  colWidths: [14, 54, 22, 18],
  style: {
    head: [],
    border: ['gray']
  }
});

table.push(
  [dateStyle('Aug 19, 2025'), valueStyle('In-Jeju Challenge'), chalk.yellow('🏆 Grand Prize'), valueStyle('Infra, BE')],
  [dateStyle('Dec 04, 2025'), valueStyle('RISE Capstone Design Result-Presentation'), chalk.hex('#C0C0C0')('🥈 Excellence Prize'), valueStyle('NLP, T5')],
  [dateStyle('Dec 18, 2025'), valueStyle('한국데이터사이언스학회 동계종합학술대회'), chalk.hex('#CD7F32')('🏅 Honorable Mention'), valueStyle('CV, Edge AI')],
  [dateStyle('Feb 26, 2026'), valueStyle('ICAIC 2026 (Tokyo, Japan)'), chalk.bold.hex('#A020F0')('🌐 Poster Present.'), valueStyle('NLP, T5')]
);

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

${chalk.dim('─────────────────────────────────────────────────────────────────────────────────────────')}
${chalk.gray('  Type the command below anytime to view this card again:')}
  ${data.npx}
`;

const options = {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  borderColor: 'cyan',
  backgroundColor: '#070B12'
};

console.log(boxen(output, options));