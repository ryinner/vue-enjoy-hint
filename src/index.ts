import { TsEnjoyHint, TsEnjoyHintSetSettings, type TsEnjoyHintOptions, type TsEnjoyHintShape, type TsEnjoyHintTarget, type TsEnjoyHintTargetOption } from '@ryinner/ts-enjoy-hint';
import { inject, toValue, type MaybeRefOrGetter, type Plugin } from 'vue';

const pluginName = '$tsEnjoyHint';

const createEnjoyHint = (settings?: Parameters<typeof TsEnjoyHintSetSettings>[0]): Plugin<Parameters<typeof TsEnjoyHintSetSettings>> => {
    const tsEnjoyHintInstance = new TsEnjoyHint();

    if (settings !== undefined) {
        TsEnjoyHintSetSettings(settings);
    }

    return {
        install (app) {
            Object.defineProperty(app.config.globalProperties, pluginName, {
                value: tsEnjoyHintInstance,
                enumerable: true
            });
            app.provide(pluginName, tsEnjoyHintInstance);
        }
    };
};

function useEnjoyHint (targets: MaybeRefOrGetter<TsEnjoyHintOptions>): { open: () => void; close: () => void } {
    const tsEnjoyHint = inject<TsEnjoyHint>(pluginName);

    if (tsEnjoyHint === undefined) {
        throw new Error('TsEnjoyHint is not installed!');
    }

    return {
        open: () => {
            tsEnjoyHint.apply(toValue(targets));
            tsEnjoyHint.open();
        },
        close: () => {
            tsEnjoyHint.close();
        }
    };
}

declare module 'vue' {
    interface ComponentCustomProperties {
        [pluginName]: TsEnjoyHint;
    }
}

export {
    TsEnjoyHintSetSettings as EnjoyHintSetSettings, createEnjoyHint, useEnjoyHint, type TsEnjoyHintOptions as EnjoyHintOptions, type TsEnjoyHintShape as EnjoyHintShape, type TsEnjoyHintTarget as EnjoyHintTarget, type TsEnjoyHintTargetOption as EnjoyHintTargetOption
};
