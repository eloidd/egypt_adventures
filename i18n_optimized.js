// 精簡多語言翻譯系統 - 優化版本
const TRANSLATIONS = {
	'zh-TW': {
		// UI 核心元素
		title: 'Egypt Adventures',
		symbolGuide: '符號說明',
		attack: '攻擊',
		skill: '技能',
		defense: '防禦',
		enemyAttack: '敵人攻擊',
		heal: '回復',
		luckyBonus: '幸運加成',
		
		// 按鈕
		front: '前',
		left: '左',
		right: '右',
		spin: '旋轉',
		stop: '停止',
		autoSpin: '自動旋轉',
		flee: '逃離',
		save: '💾 儲存',
		load: '📂 讀取',
		close: '關閉',
		equip: '裝備',
		unequip: '卸下',
		buy: '購買',
		
		// 裝備欄位
		weapon: '武器',
		armor: '防具',
		amulet: '護符',
		equipped: '已裝備',
		inventory: '背包',
		none: '無',
		setBonus: '套裝效果',
		
		// 方向提示詞
		dirFront: '前方',
		dirLeft: '左邊',
		dirRight: '右邊',
		
		// 常用訊息
		chooseDirection: '你選擇哪個方向？',
		hp: 'HP',
		stamina: '體力',
		goldCoins: '金幣',
		levelUp: '升級',
		
		// 提示動詞
		hear: '聽到',
		see: '看到',
		feel: '感覺到',
		smell: '聞到',
		sense: '察覺到',
		
		// 事件類型簡稱
		battle: '戰鬥聲',
		dust: '沙塵',
		roar: '咆哮',
		temple: '神殿',
		water: '流水聲',
		wind: '風沙',
		treasure: '寶藏氣息',
		merchant: '商隊',
		
		// 語言名稱
		languageChinese: '繁體中文',
		languageEnglish: 'English',
		languageFrench: 'Français'
	},
	
	'en': {
		title: 'Egypt Adventures',
		symbolGuide: 'Symbol Guide',
		attack: 'Attack',
		skill: 'Skill',
		defense: 'Defense',
		enemyAttack: 'Enemy Attack',
		heal: 'Heal',
		luckyBonus: 'Lucky Bonus',
		
		front: 'Forward',
		left: 'Left',
		right: 'Right',
		spin: 'Spin',
		stop: 'Stop',
		autoSpin: 'Auto Spin',
		flee: 'Flee',
		save: '💾 Save',
		load: '📂 Load',
		close: 'Close',
		equip: 'Equip',
		unequip: 'Unequip',
		buy: 'Buy',
		
		weapon: 'Weapon',
		armor: 'Armor',
		amulet: 'Amulet',
		equipped: 'Equipped',
		inventory: 'Inventory',
		none: 'None',
		setBonus: 'Set Bonus',
		
		dirFront: 'Ahead',
		dirLeft: 'To the left',
		dirRight: 'To the right',
		
		chooseDirection: 'Which direction do you choose?',
		hp: 'HP',
		stamina: 'Stamina',
		goldCoins: 'gold',
		levelUp: 'Level up',
		
		hear: 'you hear',
		see: 'you see',
		feel: 'you feel',
		smell: 'you smell',
		sense: 'you sense',
		
		battle: 'battle sounds',
		dust: 'dust rising',
		roar: 'roaring',
		temple: 'ancient temple',
		water: 'water flowing',
		wind: 'sandstorm',
		treasure: 'treasure nearby',
		merchant: 'caravan',
		
		languageChinese: '繁體中文',
		languageEnglish: 'English',
		languageFrench: 'Français'
	},
	
	'fr': {
		title: 'Egypt Adventures',
		symbolGuide: 'Guide des Symboles',
		attack: 'Attaque',
		skill: 'Compétence',
		defense: 'Défense',
		enemyAttack: 'Attaque Ennemie',
		heal: 'Soin',
		luckyBonus: 'Bonus de Chance',
		
		front: 'Avant',
		left: 'Gauche',
		right: 'Droite',
		spin: 'Tourner',
		stop: 'Arrêter',
		autoSpin: 'Tour Auto',
		flee: 'Fuir',
		save: '💾 Sauvegarder',
		load: '📂 Charger',
		close: 'Fermer',
		equip: 'Équiper',
		unequip: 'Enlever',
		buy: 'Acheter',
		
		weapon: 'Arme',
		armor: 'Armure',
		amulet: 'Amulette',
		equipped: 'Équipé',
		inventory: 'Inventaire',
		none: 'Aucun',
		setBonus: 'Bonus d\'Ensemble',
		
		dirFront: 'Devant',
		dirLeft: 'À gauche',
		dirRight: 'À droite',
		
		chooseDirection: 'Quelle direction choisissez-vous ?',
		hp: 'PV',
		stamina: 'Endurance',
		goldCoins: 'd\'or',
		levelUp: 'Niveau supérieur',
		
		hear: 'vous entendez',
		see: 'vous voyez',
		feel: 'vous sentez',
		smell: 'vous sentez',
		sense: 'vous sentez',
		
		battle: 'bruits de combat',
		dust: 'poussière',
		roar: 'rugissements',
		temple: 'temple ancien',
		water: 'eau couler',
		wind: 'tempête de sable',
		treasure: 'trésor',
		merchant: 'caravane',
		
		languageChinese: '繁體中文',
		languageEnglish: 'English',
		languageFrench: 'Français'
	}
};

let currentLanguage = localStorage.getItem('gameLanguage') || 'zh-TW';

function t(key) {
	return TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS['zh-TW'][key] || key;
}

// 組合式翻譯函數 - 動態生成完整句子
function composeHint(action, object) {
	const lang = currentLanguage;
	if (lang === 'zh-TW') {
		return `${t(action)}${t(object)}`;
	} else {
		return `${t(action)} ${t(object)}`;
	}
}

function composeMessage(template, ...args) {
	const lang = currentLanguage;
	// 根據語言返回不同的模板
	const templates = {
		'zh-TW': template.zh,
		'en': template.en,
		'fr': template.fr
	};
	const msg = templates[lang] || templates['zh-TW'];
	
	// 替換參數
	return args.reduce((str, arg, i) => str.replace(`{${i}}`, arg), msg);
}

function changeLanguage(lang) {
	if (TRANSLATIONS[lang]) {
		currentLanguage = lang;
		localStorage.setItem('gameLanguage', lang);
		updateUILanguage();
	}
}

function updateUILanguage() {
	document.querySelector('h1').textContent = t('title');
	document.querySelectorAll('[data-i18n]').forEach(el => {
		el.textContent = t(el.getAttribute('data-i18n'));
	});
	document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
		el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
	});
	
	// 更新符號說明
	const symbolList = document.querySelectorAll('#sidebar ul li');
	if (symbolList.length >= 6) {
		symbolList[0].innerHTML = `<strong>⚔️</strong> - ${t('attack')}`;
		symbolList[1].innerHTML = `<strong>⚡️</strong> - ${t('skill')}`;
		symbolList[2].innerHTML = `<strong>🛡️</strong> - ${t('defense')}`;
		symbolList[3].innerHTML = `<strong>💀</strong> - ${t('enemyAttack')}`;
		symbolList[4].innerHTML = `<strong>🧪</strong> - ${t('heal')}`;
		symbolList[5].innerHTML = `<strong>⭐</strong> - ${t('luckyBonus')}`;
	}
}

// 遊戲訊息模板範例
const MSG_TEMPLATES = {
	gainGold: {
		zh: '獲得 {0} 金幣',
		en: 'Gained {0} gold',
		fr: 'Gagné {0} d\'or'
	},
	damage: {
		zh: '造成 {0} 點傷害',
		en: 'Dealt {0} damage',
		fr: 'Infligé {0} dégâts'
	},
	foundItem: {
		zh: '發現了 {0}',
		en: 'Found {0}',
		fr: 'Trouvé {0}'
	}
};
