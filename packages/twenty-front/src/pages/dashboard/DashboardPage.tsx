import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { PageContainer } from '@/ui/layout/page/components/PageContainer';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { PageTitle } from '@/ui/utilities/page-title/components/PageTitle';
import { useLingui } from '@lingui/react/macro';
import { styled } from '@linaria/react';
import { useState } from 'react';
import { Tag, type TagColor } from 'twenty-ui/components';
import {
  IconArrowUpRight,
  IconBuildingSkyscraper,
  IconPlus,
  IconPoint,
} from 'twenty-ui/display';
import { Button, Checkbox, CheckboxShape } from 'twenty-ui/input';
import { Card, CardContent, CardHeader } from 'twenty-ui/layout';
import { themeCssVariables } from 'twenty-ui/theme-constants';

type Task = {
  id: string;
  label: string;
  time: string;
  tagText?: string;
  tagColor?: TagColor;
  done: boolean;
};

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    label: 'Follow up with Acme Corp on proposal',
    time: '10:00 AM',
    tagText: 'Proposal',
    tagColor: 'blue',
    done: false,
  },
  {
    id: '2',
    label: 'Send signed contract to Globex',
    time: '2:00 PM',
    tagText: 'Negotiation',
    tagColor: 'orange',
    done: false,
  },
  {
    id: '3',
    label: 'Prepare demo deck for Initech',
    time: '4:30 PM',
    done: false,
  },
  {
    id: '4',
    label: 'Call back Sarah at Umbrella Inc.',
    time: 'Yesterday',
    tagText: 'Discovery',
    tagColor: 'purple',
    done: false,
  },
];

const DEALS_NEEDING_ATTENTION = [
  {
    id: '1',
    name: 'Stripe — Enterprise plan',
    status: 'No activity 9 days',
    stage: 'Proposal',
    amount: '$48,000',
  },
  {
    id: '2',
    name: 'Notion — Annual renewal',
    status: 'Closing this week',
    stage: 'Negotiation',
    amount: '$120,000',
  },
  {
    id: '3',
    name: 'LinkedIn — Platform deal',
    status: 'Stalled 21 days',
    stage: 'Discovery',
    amount: '$32,500',
  },
];

const RECENT_ACTIVITY = [
  {
    id: '1',
    text: 'You completed "Send NDA to Wayne Ent."',
    time: '12m ago',
  },
  { id: '2', text: 'Maria added a note on Globex', time: '1h ago' },
  { id: '3', text: 'Maria added a note on Globex', time: '1h ago' },
];

const getTimeOfDayGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return 'Good morning';
  }

  if (currentHour < 18) {
    return 'Good afternoon';
  }

  return 'Good evening';
};

const StyledPageContainer = styled(PageContainer)`
  background-color: ${themeCssVariables.background.primary};
`;

const StyledPageContent = styled.div`
  background-color: ${themeCssVariables.background.primary};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[6]};
  overflow: auto;
  padding: ${themeCssVariables.spacing[6]};
  width: 100%;
`;

const StyledHeaderRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const StyledGreetingBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
`;

const StyledGreetingTitle = styled.span`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.xl};
  font-weight: ${themeCssVariables.font.weight.semiBold};
`;

const StyledGreetingSubtitle = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
`;

const StyledHighlightsRow = styled.div`
  display: grid;
  gap: ${themeCssVariables.spacing[4]};
  grid-template-columns: repeat(3, 1fr);
`;

const StyledHighlightCard = styled(Card)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[2]};
  padding: ${themeCssVariables.spacing[4]};
`;

const StyledHighlightLabel = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
`;

const StyledHighlightValue = styled.span`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.xxl};
  font-weight: ${themeCssVariables.font.weight.semiBold};
`;

const StyledHighlightDelta = styled.div`
  align-items: center;
  color: ${themeCssVariables.color.green};
  display: flex;
  font-size: ${themeCssVariables.font.size.xs};
  gap: ${themeCssVariables.spacing[1]};
`;

const StyledBodyRow = styled.div`
  align-items: flex-start;
  display: flex;
  gap: ${themeCssVariables.spacing[4]};
`;

const StyledFeedColumn = styled.div`
  display: flex;
  flex: 1.6;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[4]};
  min-width: 0;
`;

const StyledRightColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[4]};
  min-width: 0;
`;

const StyledCardHeaderRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const StyledTaskRow = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[3]};
`;

const StyledTaskLabel = styled.span<{ done: boolean }>`
  color: ${({ done }) =>
    done ? themeCssVariables.font.color.light : themeCssVariables.font.color.primary};
  flex: 1;
  font-size: ${themeCssVariables.font.size.md};
  min-width: 0;
  overflow: hidden;
  text-decoration: ${({ done }) => (done ? 'line-through' : 'none')};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledTaskTime = styled.span`
  color: ${themeCssVariables.font.color.light};
  font-size: ${themeCssVariables.font.size.sm};
  white-space: nowrap;
`;

const StyledDealRow = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[3]};
`;

const StyledDealIconTile = styled.div`
  align-items: center;
  background-color: ${themeCssVariables.background.tertiary};
  border-radius: ${themeCssVariables.border.radius.md};
  display: flex;
  flex-shrink: 0;
  height: ${themeCssVariables.spacing[8]};
  justify-content: center;
  width: ${themeCssVariables.spacing[8]};
`;

const StyledDealInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
  min-width: 0;
`;

const StyledDealName = styled.span`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.md};
  font-weight: ${themeCssVariables.font.weight.medium};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledDealMetaRow = styled.div`
  align-items: center;
  color: ${themeCssVariables.font.color.light};
  display: flex;
  font-size: ${themeCssVariables.font.size.sm};
  gap: ${themeCssVariables.spacing[2]};
`;

const StyledDealAmount = styled.span`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.md};
  font-weight: ${themeCssVariables.font.weight.semiBold};
  white-space: nowrap;
`;

const StyledActivityRow = styled.div`
  align-items: flex-start;
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
`;

const StyledActivityText = styled.span`
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.sm};
`;

const StyledActivityTime = styled.span`
  color: ${themeCssVariables.font.color.light};
  display: block;
  font-size: ${themeCssVariables.font.size.xs};
  margin-top: ${themeCssVariables.spacing[1]};
`;

export const DashboardPage = () => {
  const { t } = useLingui();
  const currentWorkspaceMember = useAtomStateValue(currentWorkspaceMemberState);
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const openTasksCount = tasks.filter((task) => !task.done).length;

  const handleTaskCheckedChange = (taskId: string, checked: boolean) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId ? { ...task, done: checked } : task,
      ),
    );
  };

  const highlights = [
    { label: t`Open deals`, value: '12', delta: t`2 this week` },
    { label: t`Pipeline value`, value: '$312K', delta: t`8% this month` },
    { label: t`Win rate`, value: '34%', delta: t`5% vs last month` },
  ];

  return (
    <StyledPageContainer>
      <PageTitle title={t`Dashboard | Twenty`} />
      <StyledPageContent>
        <StyledHeaderRow>
          <StyledGreetingBlock>
            <StyledGreetingTitle>
              {getTimeOfDayGreeting()}
              {currentWorkspaceMember?.name?.firstName
                ? `, ${currentWorkspaceMember.name.firstName}`
                : ''}
            </StyledGreetingTitle>
            <StyledGreetingSubtitle>
              {t`${openTasksCount} tasks due today · ${DEALS_NEEDING_ATTENTION.length} deals need attention`}
            </StyledGreetingSubtitle>
          </StyledGreetingBlock>
          <Button
            title={t`New task`}
            Icon={IconPlus}
            variant="secondary"
            size="small"
          />
        </StyledHeaderRow>

        <StyledHighlightsRow>
          {highlights.map((highlight) => (
            <StyledHighlightCard key={highlight.label} rounded>
              <StyledHighlightLabel>{highlight.label}</StyledHighlightLabel>
              <StyledHighlightValue>{highlight.value}</StyledHighlightValue>
              <StyledHighlightDelta>
                <IconArrowUpRight size={12} />
                {highlight.delta}
              </StyledHighlightDelta>
            </StyledHighlightCard>
          ))}
        </StyledHighlightsRow>

        <Card rounded>
          <CardHeader>
            <StyledCardHeaderRow>
              {t`My Tasks (${tasks.length})`}
              <Button title={t`View all`} variant="tertiary" size="small" />
            </StyledCardHeaderRow>
          </CardHeader>
          {tasks.map((task, index) => (
            <CardContent key={task.id} divider={index < tasks.length - 1}>
              <StyledTaskRow>
                <Checkbox
                  checked={task.done}
                  shape={CheckboxShape.Rounded}
                  onCheckedChange={(checked) =>
                    handleTaskCheckedChange(task.id, checked)
                  }
                />
                <StyledTaskLabel done={task.done}>
                  {task.label}
                </StyledTaskLabel>
                {task.tagText && task.tagColor && (
                  <Tag text={task.tagText} color={task.tagColor} />
                )}
                <StyledTaskTime>{task.time}</StyledTaskTime>
              </StyledTaskRow>
            </CardContent>
          ))}
        </Card>

        <StyledBodyRow>
          <StyledFeedColumn>
            <Card rounded>
              <CardHeader>
                <StyledCardHeaderRow>
                  {t`Deals needing attention`}
                  <Button title={t`View all`} variant="tertiary" size="small" />
                </StyledCardHeaderRow>
              </CardHeader>
              {DEALS_NEEDING_ATTENTION.map((deal, index) => (
                <CardContent
                  key={deal.id}
                  divider={index < DEALS_NEEDING_ATTENTION.length - 1}
                >
                  <StyledDealRow>
                    <StyledDealIconTile>
                      <IconBuildingSkyscraper size={18} />
                    </StyledDealIconTile>
                    <StyledDealInfo>
                      <StyledDealName>{deal.name}</StyledDealName>
                      <StyledDealMetaRow>
                        <span>{deal.status}</span>
                        <Tag text={deal.stage} color="gray" variant="outline" />
                      </StyledDealMetaRow>
                    </StyledDealInfo>
                    <StyledDealAmount>{deal.amount}</StyledDealAmount>
                  </StyledDealRow>
                </CardContent>
              ))}
            </Card>
          </StyledFeedColumn>

          <StyledRightColumn>
            <Card rounded>
              <CardHeader>
                <StyledCardHeaderRow>
                  {t`Recent activity`}
                  <Button title={t`View all`} variant="tertiary" size="small" />
                </StyledCardHeaderRow>
              </CardHeader>
              {RECENT_ACTIVITY.map((activity, index) => (
                <CardContent
                  key={`${activity.id}-${index}`}
                  divider={index < RECENT_ACTIVITY.length - 1}
                >
                  <StyledActivityRow>
                    <IconPoint
                      size={16}
                      color={themeCssVariables.color.blue}
                    />
                    <div>
                      <StyledActivityText>{activity.text}</StyledActivityText>
                      <StyledActivityTime>{activity.time}</StyledActivityTime>
                    </div>
                  </StyledActivityRow>
                </CardContent>
              ))}
            </Card>
          </StyledRightColumn>
        </StyledBodyRow>
      </StyledPageContent>
    </StyledPageContainer>
  );
};
