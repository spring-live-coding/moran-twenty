import { styled } from '@linaria/react';
import {
  IconRefresh,
  IconCopy,
  IconChevronUp,
  IconChevronDown,
  IconSparkles,
} from '@tabler/icons-react';
import { themeCssVariables } from 'twenty-ui/theme-constants';

type AiRecordSummaryCardProps = {
  headline: string;
  keyFacts: string[];
  dataSourcesLabel: string;
  lastUpdated: string;
  isCollapsed?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
  onCopy?: () => void;
  onToggleCollapse?: () => void;
};

const StyledCard = styled.div`
  background: ${themeCssVariables.background.secondary};
  border: 1px solid ${themeCssVariables.border.color.light};
  border-radius: ${themeCssVariables.border.radius.sm};
  margin: ${themeCssVariables.spacing[3]} ${themeCssVariables.spacing[4]};
  overflow: hidden;
`;

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  justify-content: space-between;
  padding: ${themeCssVariables.spacing[3]} ${themeCssVariables.spacing[3]}
    ${themeCssVariables.spacing[2]};
`;

const StyledHeaderLeft = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[1]};
`;

const StyledAiBadge = styled.div`
  align-items: center;
  background: ${themeCssVariables.background.transparent.light};
  border-radius: ${themeCssVariables.border.radius.pill};
  color: ${themeCssVariables.color.blue};
  display: inline-flex;
  gap: 2px;
  height: 18px;
  padding: 0 ${themeCssVariables.spacing[1]};
`;

const StyledAiBadgeLabel = styled.span`
  font-size: 10px;
  font-weight: ${themeCssVariables.font.weight.medium};
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const StyledHeaderTitle = styled.span`
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.sm};
  font-weight: ${themeCssVariables.font.weight.medium};
`;

const StyledHeaderActions = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[1]};
`;

const StyledActionButton = styled.button`
  all: unset;
  align-items: center;
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${themeCssVariables.font.color.tertiary};
  cursor: pointer;
  display: inline-flex;
  height: 24px;
  justify-content: center;
  width: 24px;

  &:hover {
    background: ${themeCssVariables.background.transparent.light};
    color: ${themeCssVariables.font.color.secondary};
  }
`;

const StyledCardBody = styled.div`
  padding: 0 ${themeCssVariables.spacing[3]} ${themeCssVariables.spacing[3]};
`;

const StyledHeadline = styled.p`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.md};
  font-weight: ${themeCssVariables.font.weight.regular};
  line-height: 1.5;
  margin: 0 0 ${themeCssVariables.spacing[2]} 0;
`;

const StyledKeyFactsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledKeyFact = styled.li`
  align-items: flex-start;
  color: ${themeCssVariables.font.color.secondary};
  display: flex;
  font-size: ${themeCssVariables.font.size.sm};
  gap: ${themeCssVariables.spacing[2]};
  line-height: 1.5;
  padding: ${themeCssVariables.spacing[1]} 0;

  &::before {
    color: ${themeCssVariables.font.color.light};
    content: '\u2022';
    flex-shrink: 0;
  }
`;

const StyledCardFooter = styled.div`
  align-items: center;
  border-top: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  justify-content: space-between;
  padding: ${themeCssVariables.spacing[2]} ${themeCssVariables.spacing[3]};
`;

const StyledDataSources = styled.span`
  color: ${themeCssVariables.font.color.light};
  font-size: ${themeCssVariables.font.size.xs};
`;

const StyledLastUpdated = styled.span`
  color: ${themeCssVariables.font.color.light};
  font-size: ${themeCssVariables.font.size.xs};
`;

const StyledShimmer = styled.div`
  animation: shimmer 1.5s infinite;
  background: linear-gradient(
    90deg,
    ${themeCssVariables.background.tertiary} 25%,
    ${themeCssVariables.background.quaternary} 50%,
    ${themeCssVariables.background.tertiary} 75%
  );
  background-size: 200% 100%;
  border-radius: ${themeCssVariables.border.radius.xs};
  height: 14px;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const StyledShimmerBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[2]};
  padding: 0 ${themeCssVariables.spacing[3]} ${themeCssVariables.spacing[3]};
`;

export const AiRecordSummaryCard = ({
  headline,
  keyFacts,
  dataSourcesLabel,
  lastUpdated,
  isCollapsed = false,
  isLoading = false,
  onRefresh,
  onCopy,
  onToggleCollapse,
}: AiRecordSummaryCardProps) => {
  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledHeaderLeft>
          <StyledAiBadge>
            <IconSparkles size={12} stroke={2} />
            <StyledAiBadgeLabel>AI</StyledAiBadgeLabel>
          </StyledAiBadge>
          <StyledHeaderTitle>Summary</StyledHeaderTitle>
        </StyledHeaderLeft>
        <StyledHeaderActions>
          <StyledActionButton onClick={onRefresh} title="Refresh">
            <IconRefresh size={14} stroke={1.8} />
          </StyledActionButton>
          <StyledActionButton onClick={onCopy} title="Copy">
            <IconCopy size={14} stroke={1.8} />
          </StyledActionButton>
          <StyledActionButton onClick={onToggleCollapse} title="Collapse">
            {isCollapsed ? (
              <IconChevronDown size={14} stroke={1.8} />
            ) : (
              <IconChevronUp size={14} stroke={1.8} />
            )}
          </StyledActionButton>
        </StyledHeaderActions>
      </StyledCardHeader>

      {isLoading && (
        <StyledShimmerBlock>
          <StyledShimmer style={{ width: '90%' }} />
          <StyledShimmer style={{ width: '70%' }} />
          <StyledShimmer style={{ width: '80%' }} />
          <StyledShimmer style={{ width: '50%' }} />
        </StyledShimmerBlock>
      )}

      {!isLoading && !isCollapsed && (
        <>
          <StyledCardBody>
            <StyledHeadline>{headline}</StyledHeadline>
            <StyledKeyFactsList>
              {keyFacts.map((fact, index) => (
                <StyledKeyFact key={index}>{fact}</StyledKeyFact>
              ))}
            </StyledKeyFactsList>
          </StyledCardBody>
          <StyledCardFooter>
            <StyledDataSources>{dataSourcesLabel}</StyledDataSources>
            <StyledLastUpdated>{lastUpdated}</StyledLastUpdated>
          </StyledCardFooter>
        </>
      )}
    </StyledCard>
  );
};
