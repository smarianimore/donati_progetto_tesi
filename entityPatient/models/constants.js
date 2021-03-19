module.exports.MINIMUM_ID = 1;
module.exports.MAXIMUM_ID = 10000;

module.exports.URL_LOCAL = 'http://localhost:8000';
module.exports.URL_HEROKU = 'http://localhost:8000'//'https://secure-brushlands-64092.herokuapp.com';

module.exports.ARRAY_FILE_TRACES = ['./traces/trace12.txt', './traces/trace13.txt', './traces/trace14.txt',
    './traces/trace15.txt', './traces/trace16.txt', './traces/trace17.txt', './traces/trace18.txt',
    './traces/trace19.txt', './traces/trace20.txt', './traces/trace21.txt', './traces/trace22.txt',
    './traces/trace31.txt', './traces/trace32.txt', './traces/trace33.txt', './traces/trace34.txt',
    './traces/trace35.txt', './traces/trace36.txt', './traces/trace37.txt', './traces/trace38.txt',
    './traces/trace39.txt', './traces/trace40.txt', './traces/trace130.txt', './traces/trace131.txt',
    './traces/trace132.txt', './traces/trace133.txt', './traces/trace134.txt', './traces/trace135.txt',
    './traces/trace136.txt', './traces/trace137.txt', './traces/trace139.txt', './traces/trace140.txt',
    './traces/trace141.txt', './traces/trace142.txt', './traces/trace144.txt', './traces/trace145.txt',
    './traces/trace146.txt', './traces/trace148.txt', './traces/trace149.txt', './traces/trace150.txt',
    './traces/trace151.txt', './traces/trace152.txt', './traces/trace153.txt', './traces/trace154.txt',
    './traces/trace155.txt', './traces/trace156.txt', './traces/trace157.txt', './traces/trace158.txt',
    './traces/trace159.txt', './traces/trace160.txt', './traces/trace162.txt', './traces/trace163.txt',
    './traces/trace164.txt', './traces/trace165.txt', './traces/trace166.txt', './traces/trace167.txt',
    './traces/trace169.txt', './traces/trace170.txt', './traces/trace171.txt', './traces/trace172.txt',
    './traces/trace173.txt', './traces/trace177.txt', './traces/trace178.txt', './traces/trace179.txt',
    './traces/trace180.txt', './traces/trace181.txt', './traces/trace182.txt', './traces/trace183.txt',
    './traces/trace184.txt', './traces/trace185.txt', './traces/trace187.txt', './traces/trace188.txt',
    './traces/trace189.txt', './traces/trace190.txt', './traces/trace191.txt', './traces/trace192.txt',
    './traces/trace194.txt', './traces/trace195.txt', './traces/trace196.txt', './traces/trace198.txt',
    './traces/trace199.txt', './traces/trace200.txt', './traces/trace201.txt', './traces/trace202.txt',
    './traces/trace203.txt', './traces/trace204.txt', './traces/trace205.txt', './traces/trace207.txt',
    './traces/trace208.txt', './traces/trace210.txt', './traces/trace211.txt', './traces/trace212.txt',
    './traces/trace213.txt', './traces/trace214.txt', './traces/trace215.txt', './traces/trace216.txt',
    './traces/trace217.txt', './traces/trace218.txt', './traces/trace219.txt', './traces/trace220.txt',
    './traces/trace221.txt']

module.exports.MIN_LACE = 0;
module.exports.MAX_LACE = 19;
module.exports.MIN_CHARLSON = 1.0;
module.exports.MAX_CHARLSON = 5.0;
module.exports.MIN_GMA = 0;
module.exports.MEDIUM_GMA = 3;
module.exports.MAX_GMA = 4;
module.exports.MIN_BARTHEL = 10;
module.exports.MEDIUM_BARTHEL_91 = 91;
module.exports.MEDIUM_BARTHEL_90 = 90;
module.exports.MEDIUM_BARTHEL_61 = 61;
module.exports.MEDIUM_BARTHEL_60 = 60;
module.exports.MAX_BARTHEL = 99;
module.exports.ARRAY_ASA = ['I','II','III','IV'];
module.exports.ASA_I = 'I';
module.exports.ASA_II = 'II';
module.exports.ASA_III = 'III';
module.exports.ASA_IV = 'IV';
module.exports.MIN_SKILLS = 0;
module.exports.MAX_SKILLS = 2;
module.exports.ARRAY_RETRIEVAL = ['YES', 'NO'];
module.exports.MIN_SELFCARE = 0;
module.exports.MAX_SELFCARE = 2;
module.exports.MIN_DWELLING = 1;
module.exports.MAX_DWELLING = 3;
module.exports.MIN_CAREER = 0;
module.exports.MAX_CAREER = 2;

module.exports.NOISE_BOTHER_THRESHOLD = 30;       //db(A)
module.exports.NOISE_DISTURBANCE_THRESHOLD = 65;
module.exports.NOISE_DAMAGE_THRESHOLD = 85;

module.exports.VIBRATIONS_LOWER_THRESHOLD = 2.5;   // m/s^2
module.exports.VIBRATIONS_HIGHER_THRESHOLD = 5.0;

module.exports.FUEL_LOWER_THRESHOLD = 25.0;    // %
module.exports.FUEL_MEDIUM_THRESHOLD = 50.0;
module.exports.FUEL_HIGHER_THRESHOLD = 75.0;

module.exports.ERGONOMICS_LOWER_THRESHOLD = 25.0;  // %
module.exports.ERGONOMICS_MEDIUM_THRESHOLD = 50.0;
module.exports.ERGONOMICS_HIGHER_THRESHOLD = 75.0;

module.exports.TERTILE_LOWER_THRESHOLD = 33.3;  // %
module.exports.TERTILE_MEDIUM_THRESHOLD = 66.6;  // %
module.exports.QUARTILE_VIBRATIONS_MIDDLE_THRESHOLD = 1.0; // m/s^2
module.exports.QUARTILE_GMA_MIDDLE_THRESHOLD = 2;
module.exports.QUARTILE_BARTHEL_LOWER_THRESHOLD_30 = 30;

module.exports.CENTER_POINT = { 'lat':44.694773, 'lng':10.769152} //Between Reggio Emilia and Modena
module.exports.RADIUS = 20000; //Meters

module.exports.NUMBER_OF_ITEMS_IN_TABLE = 5;

module.exports.MAP_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

module.exports.CENTER_OF_MAP = [44.694773,10.769152];
module.exports.MARKER_NOT_HIGHLIGHTED_COLOR = '#00BFFF';
module.exports.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR = '#1E90FF';
module.exports.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR = '#F8F8FF';
module.exports.MARKER_HIGHLIGHTED_COLOR = '#4B0082';
module.exports.MARKER_HIGHLIGHTED_STROKE_COLOR = '#c9b2da';
module.exports.MARKER_HIGHLIGHTED_CIRCLE_COLOR = '#F8F8FF';

module.exports.MARKER_NO_RISK_COLOR = '#008000';
module.exports.MARKER_NO_RISK_STROKE_COLOR = '#006400';
module.exports.MARKER_NO_RISK_CIRCLE_COLOR = '#F0FFF0';

module.exports.MARKER_LITTLE_RISK_COLOR = '#FFFF00';
module.exports.MARKER_LITTLE_RISK_STROKE_COLOR = '#9ACD32';
module.exports.MARKER_LITTLE_RISK_CIRCLE_COLOR = '#FAFAD2';

module.exports.MARKER_SOME_RISK_COLOR = '#FFA500';
module.exports.MARKER_SOME_RISK_STROKE_COLOR = '#FF8C00';
module.exports.MARKER_SOME_RISK_CIRCLE_COLOR = '#F0FFF0';

module.exports.MARKER_HIGH_RISK_COLOR = '#FF0000';
module.exports.MARKER_HIGH_RISK_STROKE_COLOR = '#8B0000';
module.exports.MARKER_HIGH_RISK_CIRCLE_COLOR = '#F0FFF0';