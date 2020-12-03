module.exports.MINIMUM_ID = 1;
module.exports.MAXIMUM_ID = 10000;

module.exports.MIN_LACE = 10;
module.exports.MAX_LACE = 80;
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
module.exports.ARRAY_ASA = ['I','II','III'];
module.exports.ASA_I = 'I';
module.exports.ASA_II = 'II';
module.exports.ASA_III = 'III';
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

module.exports.NUMBER_OF_ITEMS_IN_TABLE = 1;

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