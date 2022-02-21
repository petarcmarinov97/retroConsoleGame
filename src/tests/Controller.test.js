import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from "enzyme-to-json";
import Controller from '../components/Controller';

describe('Controller tests', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <Controller/>);
    })

    describe('Snapshots', () => {
        it("should render correctly", () => {
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        })
    })
})