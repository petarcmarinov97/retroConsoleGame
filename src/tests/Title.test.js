import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from "enzyme-to-json";
import Title from '../components/Title';

describe('Title tests', () => {

    let wrapper;
    let gameTitle = "Tetris";

    beforeEach(() => {
        wrapper = shallow(
            <Title gameTitle={gameTitle} />);
    })

    describe('Snapshots', () => {
        it("should render correctly", () => {
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        })
    })
})