import test from 'ava';
import { getJaType, JaType, katakanaToHiragana, getHiraganaOnly } from './utils.js'

test('getJaType', t => {
    t.deepEqual(getJaType("こんにちは"), JaType.noKanjiAndNumber)
    t.deepEqual(getJaType("こんに1ちは"), JaType.mixed)
    t.deepEqual(getJaType("何時ですか。"), JaType.mixed)
    t.deepEqual(getJaType("何時"), JaType.kanjiAndNumber)
    t.deepEqual(getJaType("233何時"), JaType.kanjiAndNumber)
});

test('katakanaToHiragana', t => {
    t.deepEqual(katakanaToHiragana("コンニチハ"), "こんにちは")
    t.deepEqual(katakanaToHiragana("コン23ニチハ123"), "こん23にちは123")
});

test('getHiraganaOnly', t => {
    t.deepEqual(getHiraganaOnly("コンニチハ"), "こんにちは")
    t.deepEqual(getHiraganaOnly("コン23ニチハ123"), "こん")
    t.deepEqual(getHiraganaOnly("23ニチハ123"), "にちは")
    t.deepEqual(getHiraganaOnly("23123"), "")
});
