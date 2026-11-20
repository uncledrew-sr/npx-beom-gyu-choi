#!/usr/bin/env node

import chalk from 'chalk';
import boxen from 'boxen';
import Table from 'cli-table3';

// ============================================
// Text Styles
// ============================================

const titleStyle = chalk.bold.hex('#60A5FA');
const subtitleStyle = chalk.italic.hex('#A3E635');
const labelStyle = chalk.bold.white;
const valueStyle = chalk.hex('#E2E8F0');
const linkStyle = chalk.underline.hex('#93C5FD');
const dateStyle = chalk.hex('#CBD5E1');
const descriptionStyle = chalk.hex('#CBD5E1');

// ============================================
// Responsive Settings
// ============================================

// CARD_COLUMNS allows manual layout testing.
const terminalWidth =
  Number(process.env.CARD_COLUMNS) ||
  process.stdout.columns ||
  80;

// Reserve space for boxen borders, padding, margin.
const contentWidth = Math.max(18, terminalWidth - 8);

const layout =
  contentWidth >= 93 ? 'wide' :
  contentWidth >= 70 ? 'medium' :
  'compact';

// Calculate approximate terminal display width.
// Hangul and most emoji occupy two columns.
const segmenter = new Intl.Segmenter('en', {
  granularity: 'grapheme'
});

function displayWidth(text) {
  let width = 0;

  for (const { segment } of segmenter.segment(text)) {
    if (/^\p{Mark}+$/u.test(segment)) continue;

    const wide =
      /\p{Extended_Pictographic}/u.test(segment) ||
      /[\u1100-\u115F\u2E80-\uA4CF\uAC00-\uD7A3\uF900-\uFAFF\uFF01-\uFF60\uFFE0-\uFFE6]/u.test(segment);

    width += wide ? 2 : 1;
  }

  return width;
}

// Wrap text to the available content width.
function wrapText(text, firstIndent = '', nextIndent = firstIndent) {
  const words = text.trim().split(/\s+/);
  const lines = [];

  let line = firstIndent;
  let width = displayWidth(firstIndent);
  let hasText = false;

  for (const word of words) {
    const wordWidth = displayWidth(word);
    const spaceWidth = hasText ? 1 : 0;

    if (width + spaceWidth + wordWidth <= contentWidth) {
      line += (hasText ? ' ' : '') + word;
      width += spaceWidth + wordWidth;
      hasText = true;
      continue;
    }

    if (hasText) {
      lines.push(line);
      line = nextIndent;
      width = displayWidth(nextIndent);
      hasText = false;
    }

    for (const { segment } of segmenter.segment(word)) {
      const segmentWidth = displayWidth(segment);

      if (width + segmentWidth > contentWidth && hasText) {
        lines.push(line);
        line = nextIndent;
        width = displayWidth(nextIndent);
        hasText = false;
      }

      line += segment;
      width += segmentWidth;
      hasText = true;
    }
  }

  if (line.trim()) lines.push(line);

  return lines.join('\n');
}

// ============================================
// Profile Data
// ============================================

const name = ' Beomgyu Choi ';
const handle = 'Software Engineer (Cloud / Full-Stack)';

const header =
  displayWidth(`${name} / ${handle}`) <= contentWidth
    ? `${titleStyle(name)} / ${subtitleStyle(handle)}`
    : `${titleStyle(name)}\n${subtitleStyle(wrapText(handle))}`;

const tagline = chalk.white('"Buy and hold."');

// Experience: keep dates inline on wide screens.
function experience(title, period, description) {
  const heading = layout === 'wide'
    ? `  • ${valueStyle(title)} ${dateStyle(period)}`
    : [
        valueStyle(wrapText(title, '  • ', '    ')),
        dateStyle(wrapText(period, '    ', '    '))
      ].join('\n');

  return [
    heading,
    descriptionStyle(wrapText(description, '    ', '    '))
  ].join('\n');
}

const work = [
  labelStyle('Experience'),
  '',
  experience(
    'Executive Organizer @ LIKELION JNU 14th',
    '(Feb 2026 - Present)',
    'Managing tech seminars and hackathons for the JNU chapter.'
  ),
  '',
  experience(
    'Undergraduate Researcher @ Intelligent Computing Lab',
    '(Mar 2025 - Feb 2026)',
    'Conducted research on NLP and LLM architectures.'
  )
].join('\n');

// ============================================
// Honors & Awards Data
// ============================================

const awards = [
  {
    date: 'Feb 26, 2026',
    title: 'ICAIIC 2026 (Tokyo, Japan)',
    achievement: 'Poster Present.',
    field: 'NLP, T5',
    emoji: '🌐',
    color: '#A020F0'
  },
  {
    date: 'Dec 18, 2025',
    title: '한국데이터사이언스학회 동계종합학술대회',
    achievement: 'Honorable Mention',
    field: 'CV, Edge AI',
    emoji: '🏅',
    color: '#CD7F32'
  },
  {
    date: 'Dec 04, 2025',
    title: 'RISE Capstone Design Result-Presentation',
    achievement: 'Excellence Prize',
    field: 'NLP, T5',
    emoji: '🥈',
    color: '#C0C0C0'
  },
  {
    date: 'Aug 19, 2025',
    title: 'In-Jeju Challenge',
    achievement: 'Grand Prize',
    field: 'Infra, BE',
    emoji: '🏆',
    color: '#FACC15'
  }
];

// ============================================
// Responsive Honors & Awards
// ============================================

function renderAwards() {

  // Compact: borderless list with emoji
  if (layout === 'compact') {
    return awards.map(award => {
      const achievement = chalk.bold.hex(award.color)(
        `${award.emoji} ${award.achievement}`
      );

      return [
        dateStyle(`  ${award.date}`),
        `  ${achievement}`,
        valueStyle(wrapText(award.title, '  ', '    ')),
        descriptionStyle(wrapText(award.field, '  ', '    '))
      ].join('\n');
    }).join('\n\n');
  }

  // Wide: 4 columns
  // Medium: 3 columns
  const isWide = layout === 'wide';

  const table = new Table({
    head: isWide
      ? [
          titleStyle('Date'),
          titleStyle('Title / Event'),
          titleStyle('Achievement'),
          titleStyle('Field')
        ]
      : [
          titleStyle('Date'),
          titleStyle('Title / Event'),
          titleStyle('Achievement')
        ],

    colWidths: isWide
      ? [14, 38, 22, 14]
      : [14, 31, 21],

    wordWrap: true,

    style: {
      head: [],
      border: ['white']
    }
  });

  for (const award of awards) {
    const achievement = chalk.bold.hex(award.color)(
      award.achievement
    );

    if (isWide) {
      table.push([
        dateStyle(award.date),
        valueStyle(award.title),
        achievement,
        valueStyle(award.field)
      ]);
    } else {
      table.push([
        dateStyle(award.date),
        valueStyle(award.title) +
          '\n' + descriptionStyle(award.field),
        achievement
      ]);
    }
  }

  return table.toString();
}

// ============================================
// Contact & Links
// ============================================

function formatLink(label, address, inactive = false) {
  const prefix = `  ${label}: `;
  const style = inactive ? descriptionStyle : linkStyle;

  if (displayWidth(prefix + address) <= contentWidth) {
    return labelStyle(prefix) + style(address);
  }

  return (
    labelStyle(prefix.trimEnd()) +
    '\n' +
    style(wrapText(address, '    ', '    '))
  );
}

const contact = [
  labelStyle('Contact'),
  formatLink('Personal', 'bonggutravel@gmail.com'),
  formatLink('Work', 'fredb@stu.jejunu.ac.kr')
].join('\n');

const links = [
  labelStyle('Links'),
  formatLink('GitHub', 'https://github.com/uncledrew-sr'),
  formatLink(
    'LinkedIn',
    'https://www.linkedin.com/in/beomgyu-choi-035263320/'
  ),
  formatLink(
    'Portfolio',
    'https://beomgyu-choi.dev (Coming soon)',
    true
  )
].join('\n');

const npx = chalk.inverse.bold.hex('#60A5FA')(
  ' npx npx-beom-gyu-choi '
);

// ============================================
// Output
// ============================================

const separator = descriptionStyle(
  '─'.repeat(Math.min(contentWidth, 85))
);

const output = [
  header,
  '',
  tagline,
  '',
  work,
  '',
  labelStyle('Honors & Awards'),
  renderAwards(),
  '',
  contact,
  '',
  links,
  '',
  separator,
  descriptionStyle(
    wrapText(
      'Type the command below anytime to view this card again:',
      '  ',
      '  '
    )
  ),
  `  ${npx}`
].join('\n');

// ============================================
// Box Settings
// ============================================

const options = {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  borderColor: '#60A5FA',
  backgroundColor: '#070B12'
};

console.log(boxen(output, options));
