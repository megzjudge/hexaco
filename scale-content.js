const HEXACO_DOMAINS = [
  {
    id: 'honesty',
    letter: 'H',
    name: 'Honesty-Humility',
    description:
      'Persons with very high scores on the Honesty-Humility scale avoid manipulating others for personal gain, feel little temptation to break rules, are uninterested in lavish wealth and luxuries, and feel no special entitlement to elevated social status. Conversely, persons with very low scores on this scale will flatter others to get what they want, are inclined to break rules for personal profit, are motivated by material gain, and feel a strong sense of self-importance.',
    facets: [
      {
        name: 'Sincerity',
        text: 'Assesses a tendency to be genuine in interpersonal relations. Low scorers will flatter others or pretend to like them in order to obtain favors, whereas high scorers are unwilling to manipulate others.',
      },
      {
        name: 'Fairness',
        text: 'Assesses a tendency to avoid fraud and corruption. Low scorers are willing to gain by cheating or stealing, whereas high scorers are unwilling to take advantage of other individuals or of society at large.',
      },
      {
        name: 'Greed Avoidance',
        text: 'Assesses a tendency to be uninterested in possessing lavish wealth, luxury goods, and signs of high social status. Low scorers want to enjoy and to display wealth and privilege, whereas high scorers are not especially motivated by monetary or social-status considerations.',
      },
      {
        name: 'Modesty',
        text: 'Assesses a tendency to be modest and unassuming. Low scorers consider themselves as superior and as entitled to privileges that others do not have, whereas high scorers view themselves as ordinary people without any claim to special treatment.',
      },
    ],
  },
  {
    id: 'emotionality',
    letter: 'E',
    name: 'Emotionality',
    description:
      'Persons with very high scores on the Emotionality scale experience fear of physical dangers, experience anxiety in response to life\'s stresses, feel a need for emotional support from others, and feel empathy and sentimental attachments with others. Conversely, persons with very low scores on this scale are not deterred by the prospect of physical harm, feel little worry even in stressful situations, have little need to share their concerns with others, and feel emotionally detached from others.',
    facets: [
      {
        name: 'Fearfulness',
        text: 'Assesses a tendency to experience fear. Low scorers feel little fear of injury and are relatively tough, brave, and insensitive to physical pain, whereas high scorers are strongly inclined to avoid physical harm.',
      },
      {
        name: 'Anxiety',
        text: 'Assesses a tendency to worry in a variety of contexts. Low scorers feel little stress in response to difficulties, whereas high scorers tend to become preoccupied even by relatively minor problems.',
      },
      {
        name: 'Dependence',
        text: 'Assesses one\'s need for emotional support from others. Low scorers feel self-assured and able to deal with problems without any help or advice, whereas high scorers want to share their difficulties with those who will provide encouragement and comfort.',
      },
      {
        name: 'Sentimentality',
        text: 'Assesses a tendency to feel strong emotional bonds with others. Low scorers feel little emotion when saying good-bye or in reaction to the concerns of others, whereas high scorers feel strong emotional attachments and an empathic sensitivity to the feelings of others.',
      },
    ],
  },
  {
    id: 'extraversion',
    letter: 'X',
    name: 'eXtraversion',
    description:
      'Persons with very high scores on the Extraversion scale feel positively about themselves, feel confident when leading or addressing groups of people, enjoy social gatherings and interactions, and experience positive feelings of enthusiasm and energy. Conversely, persons with very low scores on this scale consider themselves unpopular, feel awkward when they are the center of social attention, are indifferent to social activities, and feel less lively and optimistic than others do.',
    facets: [
      {
        name: 'Social Self-Esteem',
        text: 'Assesses a tendency to have positive self-regard, particularly in social contexts. Low scorers tend to have a sense of personal worthlessness and to see themselves as unpopular, whereas high scorers are generally satisfied with themselves and consider themselves to have likable qualities.',
      },
      {
        name: 'Social Boldness',
        text: 'Assesses one\'s comfort or confidence within a variety of social situations. Low scorers feel shy or awkward in positions of leadership or when speaking in public, whereas high scorers are willing to approach strangers and are willing to speak up within group settings.',
      },
      {
        name: 'Sociability',
        text: 'Assesses a tendency to enjoy conversation, social interaction, and parties. Low scorers generally prefer solitary activities and do not seek out conversation, whereas high scorers enjoy talking, visiting, and celebrating with others.',
      },
      {
        name: 'Liveliness',
        text: 'Assesses one\'s typical enthusiasm and energy. Low scorers tend not to feel especially cheerful or dynamic, whereas high scorers usually experience a sense of optimism and high spirits.',
      },
    ],
  },
  {
    id: 'agreeableness',
    letter: 'A',
    name: 'Agreeableness (versus Anger)',
    description:
      'Persons with very high scores on the Agreeableness scale forgive the wrongs that they suffered, are lenient in judging others, are willing to compromise and cooperate with others, and can easily control their temper. Conversely, persons with very low scores on this scale hold grudges against those who have harmed them, are rather critical of others\' shortcomings, are stubborn in defending their point of view, and feel anger readily in response to mistreatment.',
    facets: [
      {
        name: 'Forgivingness',
        text: 'Assesses one\'s willingness to feel trust and liking toward those who may have caused one harm. Low scorers tend to "hold a grudge" against those who have offended them, whereas high scorers are usually ready to trust others again and to re-establish friendly relations after having been treated badly.',
      },
      {
        name: 'Gentleness',
        text: 'Assesses a tendency to be mild and lenient in dealings with other people. Low scorers tend to be critical in their evaluations of others, whereas high scorers are reluctant to judge others harshly.',
      },
      {
        name: 'Flexibility',
        text: 'Assesses one\'s willingness to compromise and cooperate with others. Low scorers are seen as stubborn and are willing to argue, whereas high scorers avoid arguments and accommodate others\' suggestions, even when these may be unreasonable.',
      },
      {
        name: 'Patience',
        text: 'Assesses a tendency to remain calm rather than to become angry. Low scorers tend to lose their tempers quickly, whereas high scorers have a high threshold for feeling or expressing anger.',
      },
    ],
  },
  {
    id: 'conscientiousness',
    letter: 'C',
    name: 'Conscientiousness',
    description:
      'Persons with very high scores on the Conscientiousness scale organize their time and their physical surroundings, work in a disciplined way toward their goals, strive for accuracy and perfection in their tasks, and deliberate carefully when making decisions. Conversely, persons with very low scores on this scale tend to be unconcerned with orderly surroundings or schedules, avoid difficult tasks or challenging goals, are satisfied with work that contains some errors, and make decisions on impulse or with little reflection.',
    facets: [
      {
        name: 'Organization',
        text: 'Assesses a tendency to seek order, particularly in one\'s physical surroundings. Low scorers tend to be sloppy and haphazard, whereas high scorers keep things tidy and prefer a structured approach to tasks.',
      },
      {
        name: 'Diligence',
        text: 'Assesses a tendency to work hard. Low scorers have little self-discipline and are not strongly motivated to achieve, whereas high scorers have a strong "work ethic" and are willing to exert themselves.',
      },
      {
        name: 'Perfectionism',
        text: 'Assesses a tendency to be thorough and concerned with details. Low scorers tolerate some errors in their work and tend to neglect details, whereas high scorers check carefully for mistakes and potential improvements.',
      },
      {
        name: 'Prudence',
        text: 'Assesses a tendency to deliberate carefully and to inhibit impulses. Low scorers act on impulse and tend not to consider consequences, whereas high scorers consider their options carefully and tend to be cautious and self-controlled.',
      },
    ],
  },
  {
    id: 'openness',
    letter: 'O',
    name: 'Openness to Experience',
    description:
      'Persons with very high scores on the Openness to Experience scale become absorbed in the beauty of art and in nature, are inquisitive about various domains of knowledge, use their imagination freely in everyday life, and take an interest in unusual ideas or people. Conversely, persons with very low scores on this scale are rather unimpressed by most works of art, feel little intellectual curiosity, avoid creative pursuits, and feel little attraction toward ideas that may seem radical or unconventional.',
    facets: [
      {
        name: 'Aesthetic Appreciation',
        text: 'Assesses one\'s enjoyment of beauty in art and in nature. Low scorers tend not to become absorbed in works of art or in natural wonders, whereas high scorers have a strong appreciation of various art forms and of natural wonders.',
      },
      {
        name: 'Inquisitiveness',
        text: 'Assesses a tendency to seek information about, and experience with, the natural and human world. Low scorers have little curiosity about the natural or social sciences, whereas high scorers read widely and are interested in travel.',
      },
      {
        name: 'Creativity',
        text: 'Assesses one\'s preference for innovation and experiment. Low scorers have little inclination for original thought, whereas high scorers actively seek new solutions to problems and express themselves in art.',
      },
      {
        name: 'Unconventionality',
        text: 'Assesses a tendency to accept the unusual. Low scorers avoid eccentric or nonconforming persons, whereas high scorers are receptive to ideas that might seem strange or radical.',
      },
    ],
  },
];

const HEXACO_ALTRUISM = {
  name: 'Altruism (versus Antagonism)',
  text: 'Assesses a tendency to be sympathetic and soft-hearted toward others. Low scorers are not upset by the prospect of hurting others and may be seen as hard-hearted, whereas high scorers avoid causing harm and react with generosity toward those who are weak or in need of help.',
};

const HEXACO_LANGUAGES = [
  'Albanian', 'Arabic', 'Catalan', 'Bulgarian', 'Chinese (Simplified)', 'Chinese (Traditional)',
  'Croatian', 'Czech', 'Danish', 'Dutch', 'English', 'Finnish', 'French', 'Georgian', 'German',
  'Greek', 'Hungarian', 'Icelandic', 'Indonesian', 'Italian', 'Japanese', 'Korean', 'Lithuanian',
  'Macedonian', 'Malay', 'Norwegian', 'Persian', 'Polish', 'Brazilian Portuguese', 'Portuguese',
  'Romanian', 'Russian', 'Serbian', 'Slovak', 'Slovenian', 'Spanish', 'Swedish', 'Tamil', 'Thai',
  'Turkish', 'Ukrainian', 'Urdu', 'Vietnamese',
];
