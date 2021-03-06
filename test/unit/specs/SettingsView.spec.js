import Vue from 'vue';
import { mountComponent } from '../utils';
import SettingsView from '../../../src/components/SettingsView';

describe('SettingsView', () => {
  describe('Test Filters', () => {
    it('[toMinutes] filter transforms the inputs correctly', () => {
      const vm = mountComponent(SettingsView, {
        workDuration: 1,
        breakDuration: 1,
        allowNotification: false,
      });

      expect(vm.$options.filters.toMinutes(6666, 'Test')).to.equal('Test (111.1 min)');
      expect(vm.$options.filters.toMinutes(600, 'Work Duration')).to.equal('Work Duration (10 min)');
      expect(vm.$options.filters.toMinutes(0, 'Break Duration')).to.equal('Break Duration (0 min)');
    });
  });

  describe('Test Methods', () => {
    it('[backToAppView] emits [change] event with correct values', () => {
      const spy = sinon.spy();
      const vm = new Vue({
        template: '<div><SettingsView :workDuration="1" :breakDuration="1" :allowNotification="false" v-on:change="callbackFn"></SettingsView></div>',
        components: { SettingsView },
        methods: {
          callbackFn: spy,
        },
      }).$mount();
      vm.$children[0].backToAppView();

      const exectedArg = { workDuration: 1, breakDuration: 1, allowNotification: false };

      expect(spy.callCount).to.equal(1);
      expect(spy).to.have.been.calledWith(exectedArg);
    });
  });
});
