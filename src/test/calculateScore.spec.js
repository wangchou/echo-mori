import test from 'ava';
import process from 'process'
import { calculateScore, getPhoneticCharacters, LangType } from '../client/core/calculateScore.js'

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// need to install mecab service and launch backend server
test('getPhoneticCharacter', async t => {
    t.is(await getPhoneticCharacters("今は、何時ですか。", LangType.ja), "イマワナンジデスカ")
    t.is(await getPhoneticCharacters("逃げるは恥だが役に立つ", LangType.ja), "ニゲルハハジダガヤクニタツ")
    t.is(await getPhoneticCharacters("How are you?"), "howareyou")
});

test('calculateScore', async t => {
    t.is(await calculateScore("今は、何時ですか。", "いまはなんじですか", LangType.ja), 100)
    t.is(await calculateScore("逃げるは恥だが役に立つ", "ニゲルハハジダガヤクニタツ", LangType.ja), 100)
    t.is(await calculateScore("How are you?", "How old are you?"), 75)
});