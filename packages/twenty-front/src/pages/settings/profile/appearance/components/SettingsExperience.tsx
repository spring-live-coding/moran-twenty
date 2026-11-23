import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { FormatPreferencesSettings } from '@/settings/experience/components/FormatPreferencesSettings';
import { FormatPreview } from '@/settings/experience/components/FormatPreview';
import { SettingsPageLayout } from '@/settings/components/layout/SettingsPageLayout';
import { useColorScheme } from '@/ui/theme/hooks/useColorScheme';
import { styled } from '@linaria/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { SettingsPath } from 'twenty-shared/types';
import { getSettingsPath } from 'twenty-shared/utils';
import { H2Title } from 'twenty-ui/display';
import { ColorSchemePicker } from 'twenty-ui/input';
import { Section } from 'twenty-ui/layout';
import { themeCssVariables } from 'twenty-ui/theme-constants';
import { LocalePicker } from '~/pages/settings/profile/appearance/components/LocalePicker';

// 520px form column + 32px gap + 340px preview column + horizontal padding
const EXPERIENCE_CONTENT_MAX_WIDTH = 956;

const StyledLayout = styled.div`
  display: grid;
  gap: ${themeCssVariables.spacing[8]};
  grid-template-columns: minmax(0, 1fr) 340px;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const StyledFormColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[8]};
  min-width: 0;
`;

export const SettingsExperience = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const { t } = useLingui();

  return (
    <SettingsPageLayout
      title={t`Experience`}
      links={[
        {
          children: <Trans>User</Trans>,
          href: getSettingsPath(SettingsPath.ProfilePage),
        },
        { children: <Trans>Experience</Trans> },
      ]}
    >
      <SettingsPageContainer maxWidth={EXPERIENCE_CONTENT_MAX_WIDTH}>
        <StyledLayout>
          <StyledFormColumn>
            <Section>
              <H2Title title={t`Appearance`} />
              <ColorSchemePicker
                value={colorScheme}
                onChange={setColorScheme}
                lightLabel={t`Light`}
                darkLabel={t`Dark`}
                systemLabel={t`System settings`}
              />
            </Section>

            <Section>
              <H2Title
                title={t`Language`}
                description={t`Select your preferred language`}
              />
              <LocalePicker />
            </Section>

            <Section>
              <H2Title
                title={t`Formats`}
                description={t`Configure date, time, number, timezone, and calendar start day`}
              />
              <FormatPreferencesSettings />
            </Section>
          </StyledFormColumn>
          <FormatPreview />
        </StyledLayout>
      </SettingsPageContainer>
    </SettingsPageLayout>
  );
};
