import CodeSnippet from '@/components/CodeSnippet';
import CircularColorsDemo from '@/components/CircularColorsDemo';
import DivisionGroupsDemo from '@/components/DivisionGroupsDemo';
import {H2, H3} from '@/components/PostHeading';

const COMPONENT_MAP = {
  pre: CodeSnippet,
  DivisionGroupsDemo,
  CircularColorsDemo,
  h2: H2,
  h3: H3
}

export default COMPONENT_MAP;
