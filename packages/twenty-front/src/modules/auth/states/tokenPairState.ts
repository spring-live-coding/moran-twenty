import { createAtomState } from '@/ui/utilities/state/jotai/utils/createAtomState';
import { type AuthTokenPair } from '~/generated-metadata/graphql';

export const tokenPairState = createAtomState<AuthTokenPair | null>({
  key: 'tokenPairState',
  defaultValue: null,
  useCookieStorage:
    import.meta.env.DEV &&
    import.meta.env.REACT_APP_SPRING_BACKENDLESS === 'true'
      ? undefined
      : {
          cookieKey: 'tokenPair',
          validateInitFn: (payload: AuthTokenPair) =>
            Boolean(payload['accessOrWorkspaceAgnosticToken']),
        },
});
