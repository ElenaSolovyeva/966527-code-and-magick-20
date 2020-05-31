'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var GAP = 10;
var TITLE_FONT = 'PT Mono 16px';
var ROW_FONT = 'PT Mono 16px';
var TEXT_COLOR = '#000';
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var DIAGRAM_HEIGHT = 150;
var PLAYER_NAME = 'Вы';
var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
var HUE = 240;

var xRow = CLOUD_X + GAP * 1.2;
var yRow1 = CLOUD_Y + GAP * 4;
var yRow2 = CLOUD_Y + GAP * 6;
var barBottom = CLOUD_Y + CLOUD_HEIGHT - GAP * 3;
var nameY = CLOUD_Y + CLOUD_HEIGHT - GAP;

var getMaxElement = function (array) {
  var max = array[0];
  for (var i = 1; i < array.length; i += 1) {
    if (array[i] > max) {
      max = array [i];
    }
  }
  return max;
};

var getRandomInteger = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

var getRandomColor = function () {
  var randomColor = 'hsl(' + HUE + ', ' + getRandomInteger(1, 100) + '%, 50%)';
  return randomColor;
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = SHADOW_COLOR;
  ctx.fillRect(x + GAP, y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, string, color, font, x, y) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(string, x, y);
};

var renderBar = function (ctx, barColor, barX, barY, barHeight, name, time) {
  var timeY = barBottom - barHeight - GAP;

  ctx.fillStyle = barColor;
  ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);

  renderText(ctx, name, TEXT_COLOR, ROW_FONT, barX, nameY);
  renderText(ctx, time, TEXT_COLOR, ROW_FONT, barX, timeY);
};

var renderDiagram = function (ctx, font, times, names) {
  for (var i = 0; i < times.length; i += 1) {
    var barX = CLOUD_X + GAP * 4 + BAR_GAP * i + BAR_WIDTH * i;
    var barHeight = times[i] * (DIAGRAM_HEIGHT - GAP * 2) / getMaxElement(times);
    var barY = barBottom - barHeight;
    var barColor = names[i] === PLAYER_NAME ? PLAYER_COLOR : getRandomColor();
    var time = Math.round(times[i]);

    renderBar(ctx, barColor, barX, barY, barHeight, names[i], time);
  }
};

window.renderStatistics = function (ctx, names, times) { //
  renderCloud(ctx, CLOUD_X, CLOUD_Y + GAP, '#fff');

  renderText(ctx, 'Ура, вы победили!', TEXT_COLOR, TITLE_FONT, xRow, yRow1);
  renderText(ctx, 'Список результатов:', TEXT_COLOR, TITLE_FONT, xRow, yRow2);

  renderDiagram(ctx, ROW_FONT, times, names);
};
