import test from 'ava';
import { getParts, getRubyPairs } from '../client/utils/rubyText.js'

test('getParts', t => {
    t.deepEqual(getParts("今は何時ですか。"), ["今", "は", "何時", "ですか。"])
    t.deepEqual(getParts("逃げるは恥だが役に立つ"), ['逃', 'げるは', '恥', 'だが', '役', 'に', '立', 'つ'])
});

test('getRubyPairs', t => {
    var parts = ['逃', 'げるは', '恥', 'だが', '役', 'に', '立', 'つ']
    var kana = "にげるははじだがやくにたつ"
    var result = [
        { rb: '逃', rt: 'に' },
        { rb: 'げるは', rt: '' },
        { rb: '恥', rt: 'はじ' },
        { rb: 'だが', rt: '' },
        { rb: '役', rt: 'やく' },
        { rb: 'に', rt: '' },
        { rb: '立', rt: 'た' },
        { rb: 'つ', rt: '' }
    ]
    t.deepEqual(getRubyPairs(parts, kana), result)
});
