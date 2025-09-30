import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import DateBoxContent from '../DateBoxContent.vue';

describe('DateBoxContent', () => {
  it('renders properly', () => {
    const wrapper = mount(DateBoxContent);
    expect(wrapper.text()).toContain('Date and time');
  });
});
