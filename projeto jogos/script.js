
const area = document.getElementById('game-area');
document.querySelectorAll('nav button').forEach(b => b.onclick = () => switchGame(b.dataset.game));

let secret, attempts, saldo = 10;

function switchGame(game) {
  area.innerHTML = '';
  if (game === 'guess') renderGuess();
  if (game === 'parimpar') renderParImpar();
  if (game === 'casino') renderCasino();
  if (game === 'rps') renderRps();
}

function renderGuess() {
  secret = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  area.innerHTML = '<h2>Adivinhe o número (1–100)</h2><input id="guess-inp" type="number" min="1" max="100"><button onclick="checkGuess()">Chutar</button><p id="guess-msg"></p>';
}
function checkGuess() {
  const val = Number(document.getElementById('guess-inp').value);
  if (!val || val < 1 || val > 100) return alert('Digite de 1 a 100');
  attempts++;
  const msg = document.getElementById('guess-msg');
  if (val < secret) msg.textContent = `Está maior! Tentativa ${attempts}`;
  else if (val > secret) msg.textContent = `Está menor! Tentativa ${attempts}`;
  else msg.innerHTML = '<span class="win">🎉 Acertou em ' + attempts + ' tentativas!</span>';
}

function renderParImpar() {
  area.innerHTML = '<h2>Par ou Ímpar</h2><select id="choice"><option value="par">Par</option><option value="impar">Ímpar</option></select><input id="num" type="number" min="0" max="10" placeholder="0–10"><button onclick="playParImpar()">Jogar</button><p id="pi-msg"></p>';
}
function playParImpar() {
  const escolha = document.getElementById('choice').value;
  const n = Number(document.getElementById('num').value);
  const m = Math.floor(Math.random() * 11);
  const soma = n + m;
  const res = soma % 2 === 0 ? 'par' : 'impar';
  const classe = res === escolha ? 'win' : 'lose';
  document.getElementById('pi-msg').innerHTML = `<span class="${classe}">Você: ${n}, Máquina: ${m} (Soma ${soma} — ${res})</span>`;
}

function renderCasino() {
  area.innerHTML = '<h2>Cassino</h2><p>Saldo: <span id="saldo">' + saldo + '</span></p><input id="bet" placeholder="Digite sua aposta"><button onclick="spinCasino()">Girar</button><div id="casino-out"></div>';
}
function spinCasino() {
  const bet = Number(document.getElementById('bet').value);
  const out = document.getElementById('casino-out');
  if (!bet || bet < 1 || bet > saldo) return out.innerHTML = '<p class="lose">Aposta inválida!</p>';
  saldo -= bet;
  let result = Math.random() < 0.3 ? 'win' : 'lose';
  if (result === 'win') saldo += bet * 3;
  out.innerHTML = `<p class="${result}">Resultado: ${result.toUpperCase()}! Novo saldo: ${saldo}</p>`;
  document.getElementById('saldo').textContent = saldo;
}

function renderRps() {
  area.innerHTML = '<h2>Pedra, Papel ou Tesoura</h2><button onclick="playRps(\'rock\')">Pedra</button><button onclick="playRps(\'paper\')">Papel</button><button onclick="playRps(\'scissors\')">Tesoura</button><p id="rps-msg"></p>';
}
function playRps(player) {
  const options = ['rock','paper','scissors'];
  const pc = options[Math.floor(Math.random() * 3)];
  const msg = document.getElementById('rps-msg');
  if (player === pc) msg.innerHTML = '<span class="info">Empate!</span>';
  else if ((player==='rock'&&pc==='scissors')||(player==='paper'&&pc==='rock')||(player==='scissors'&&pc==='paper'))
    msg.innerHTML = '<span class="win">Você venceu!</span>';
  else msg.innerHTML = '<span class="lose">Você perdeu!</span>';
}
