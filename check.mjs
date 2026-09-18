// Run: node check.mjs
import assert from 'node:assert/strict';
import { visibleProjectIds, scrollProgress } from './dist/app.mjs';
assert.deepEqual(visibleProjectIds('all'), ['water','lumen','steam']);
assert.deepEqual(visibleProjectIds('water'), ['water','lumen']);
assert.deepEqual(visibleProjectIds('education'), ['steam']);
assert.deepEqual(visibleProjectIds('invalid'), []);
for (const [y,height,viewport,expected] of [[0,2000,1000,0],[500,2000,1000,.5],[1500,2000,1000,1],[-10,2000,1000,0],[0,500,1000,0]]) assert.equal(scrollProgress(y,height,viewport),expected);
console.log('PASS: project categories and scroll progress boundaries');
import {emailDraft} from './dist/contact.mjs';
const draft=new URL(emailDraft('Robin & team','College collaboration','Hello\nWater & energy?'));
assert.equal(draft.pathname,'ieeekerala.sight@gmail.com');
assert.equal(draft.searchParams.get('subject'),'SIGHT Kerala · College collaboration');
assert.equal(draft.searchParams.get('body'),'Hello IEEE SIGHT Kerala team,\n\nHello\nWater & energy?\n\nRobin & team');
assert.throws(()=>emailDraft(' ','Volunteering','Message'));
assert.throws(()=>emailDraft('Robin','Invalid','Message'));
console.log('PASS: enquiry validation and email encoding');
