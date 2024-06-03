import $ from '@js/core/renderer';
import { extend } from '@js/core/utils/extend';
import { isPlainObject, isString } from '@js/core/utils/type';
import { value as viewPort } from '@js/core/utils/view_port';
import { getWindow } from '@js/core/utils/window';
import Toast from '@js/ui/toast';

const window = getWindow();
let $notify = null;
const $containers = {};

function notify(message, /* optional */ typeOrStack, displayTime) {
  const options = isPlainObject(message) ? message : { message };
  const stack = isPlainObject(typeOrStack) ? typeOrStack : undefined;
  const type = isPlainObject(typeOrStack) ? undefined : typeOrStack;
  const { onHidden: userOnHidden } = options;

  if (stack?.position) {
    const { position } = stack;
    const direction = stack.direction || getDefaultDirection(position);
    const containerKey = isString(position)
      ? position
      : `${position.top}-${position.left}-${position.bottom}-${position.right}`;

    const { onShowing: userOnShowing } = options;
    const $container = getStackContainer(containerKey);
    setContainerClasses($container, direction);

    extend(options, {
      container: $container,
      _skipContentPositioning: true,
      onShowing(args) {
        setContainerStyles($container, direction, position);
        userOnShowing?.(args);
      },
    });
  }

  extend(options, {
    type,
    displayTime,
    onHidden(args) {
      $(args.element).remove();
      userOnHidden?.(args);
    },
  });
  // @ts-expect-error
  $notify = $('<div>').appendTo(viewPort());
  // @ts-expect-error
  new Toast($notify, options).show();
}

const getDefaultDirection = (position) => (isString(position) && position.includes('top') ? 'down-push' : 'up-push');

const createStackContainer = (key) => {
  const $container = $('<div>').appendTo(viewPort());
  $containers[key] = $container;

  return $container;
};

const getStackContainer = (key) => {
  const $container = $containers[key];

  return $container || createStackContainer(key);
};

const setContainerClasses = (container, direction) => {
  const containerClasses = `dx-toast-stack dx-toast-stack-${direction}-direction`;
  container.removeAttr('class').addClass(containerClasses);
};

const setContainerStyles = (container, direction, position) => {
  const { offsetWidth: toastWidth, offsetHeight: toastHeight } = container.children().first().get(0);

  const dimensions = {
    toastWidth,
    toastHeight,
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
  };

  const coordinates = isString(position) ? getCoordinatesByAlias(position, dimensions) : position;

  const styles = getPositionStylesByCoordinates(direction, coordinates, dimensions);

  container.css(styles);
};

const getCoordinatesByAlias = (alias, {
  toastWidth, toastHeight, windowHeight, windowWidth,
}) => {
  switch (alias) {
    case 'top left':
      return { top: 10, left: 10 };
    case 'top right':
      return { top: 10, right: 10 };
    case 'bottom left':
      return { bottom: 10, left: 10 };
    case 'bottom right':
      return { bottom: 10, right: 10 };
    case 'top center':
      return { top: 10, left: Math.round(windowWidth / 2 - toastWidth / 2) };
    case 'left center':
      return { top: Math.round(windowHeight / 2 - toastHeight / 2), left: 10 };
    case 'right center':
      return { top: Math.round(windowHeight / 2 - toastHeight / 2), right: 10 };
    case 'center':
      return {
        top: Math.round(windowHeight / 2 - toastHeight / 2),
        left: Math.round(windowWidth / 2 - toastWidth / 2),
      };
    case 'bottom center':
    default:
      return { bottom: 10, left: Math.round(windowWidth / 2 - toastWidth / 2) };
  }
};
// @ts-expect-error
const getPositionStylesByCoordinates = (direction, coordinates, dimensions) => {
  const {
    toastWidth, toastHeight, windowHeight, windowWidth,
  } = dimensions;

  // eslint-disable-next-line default-case
  switch (direction.replace(/-push|-stack/g, '')) {
    case 'up':
      return {
        bottom: coordinates.bottom ?? windowHeight - toastHeight - coordinates.top,
        top: '',
        left: coordinates.left ?? '',
        right: coordinates.right ?? '',
      };
    case 'down':
      return {
        top: coordinates.top ?? windowHeight - toastHeight - coordinates.bottom,
        bottom: '',
        left: coordinates.left ?? '',
        right: coordinates.right ?? '',
      };
    case 'left':
      return {
        right: coordinates.right ?? windowWidth - toastWidth - coordinates.left,
        left: '',
        top: coordinates.top ?? '',
        bottom: coordinates.bottom ?? '',
      };
    case 'right':
      return {
        left: coordinates.left ?? windowWidth - toastWidth - coordinates.right,
        right: '',
        top: coordinates.top ?? '',
        bottom: coordinates.bottom ?? '',
      };
  }
};

/// #DEBUG
Object.setPrototypeOf(notify, {
  _resetContainers() {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    Object.keys($containers).forEach((key) => delete $containers[key]);
  },
});
/// #ENDDEBUG

export default notify;
