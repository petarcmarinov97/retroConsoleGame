import { shallow } from 'enzyme';
import { shallowToJson } from "enzyme-to-json";
import { buildTetris } from '../utils/pieces.js';

describe('Tetris tests', () => {
    let cvs, nextElement, ctx, nextElementCtx, pointsElement, cleansElement, levelElement;

    beforeEach(() => {
        cvs = document.createElement('canvas');
        ctx = cvs.getContext('2d');
        nextElement = document.createElement('canvas');
        nextElementCtx = nextElement.getContext('2d');
        pointsElement = document.getElementById("points");
        cleansElement = document.getElementById("cleans");
        levelElement = document.getElementById("level");
    })

    describe('Snapshots', () => {
        it("should build", () => {
            buildTetris(cvs, ctx, nextElementCtx, pointsElement, cleansElement, levelElement);
            const events = ctx.__getEvents();

            expect(events).toMatchSnapshot();
        })
    })
})