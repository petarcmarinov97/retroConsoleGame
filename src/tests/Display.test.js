import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from "enzyme-to-json";
import Display from '../components/Display';

describe('Display tests', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <Display />);
    })

    describe('Snapshots', () => {
        it("should render correctly", () => {
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        })
    })
})