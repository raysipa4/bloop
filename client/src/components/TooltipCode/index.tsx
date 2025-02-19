import Tippy, { TippyProps } from '@tippyjs/react/headless';
import { TokenInfo, TokenInfoItem } from '../../types/results';
import RefsDefsPopup from './RefsDefsPopup';

type Props = {
  language: string;
  data: TokenInfo;
  position: 'left' | 'center' | 'right';
  children: React.ReactNode;
  onHover: () => void;
  repoName: string;
  onRefDefClick: (lineNum: TokenInfoItem, filePath: string) => void;
};

export const TypeMap = {
  REF: 'references',
  DEF: 'definitions',
} as const;

const positionMapping = {
  left: '-start',
  right: '-end',
  center: '',
};

const TooltipCode = ({
  data,
  position,
  language,
  children,
  onHover,
  repoName,
  onRefDefClick,
}: Props) => {
  return (
    <Tippy
      placement={
        `bottom${positionMapping[position]}` as TippyProps['placement']
      }
      interactive
      trigger="click"
      appendTo={(ref) => ref.ownerDocument.body}
      onShow={onHover}
      render={(attrs) => (
        <RefsDefsPopup
          onRefDefClick={onRefDefClick}
          language={language}
          placement={attrs['data-placement']}
          data={data}
          repoName={repoName}
        />
      )}
    >
      <span className={'cursor-pointer'}>{children}</span>
    </Tippy>
  );
};

export default TooltipCode;
