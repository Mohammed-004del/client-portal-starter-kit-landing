import { PRICE_USD } from './config'

export type Locale = 'en' | 'ar'

/**
 * Every piece of user-facing text is one of these two shapes, so a missing
 * Arabic string is a compile error rather than an English string leaking
 * into the Arabic page.
 */
export type Copy = Record<Locale, string>
export type CopyList = Record<Locale, readonly string[]>

export const LOCALES: readonly Locale[] = ['en', 'ar']
export const DEFAULT_LOCALE: Locale = 'en'

export const DIR: Record<Locale, 'ltr' | 'rtl'> = { en: 'ltr', ar: 'rtl' }

/** Shown on the toggle: the language you would switch TO. */
export const LOCALE_SWITCH_LABEL: Copy = { en: 'العربية', ar: 'English' }
export const LOCALE_SWITCH_ARIA: Copy = {
  en: 'Switch to Arabic',
  ar: 'التبديل إلى الإنجليزية',
}

/* ------------------------------------------------------------------ meta */

export const META = {
  title: {
    en: 'Client Portal Starter Kit — security you can check, not claims you have to trust',
    ar: 'Client Portal Starter Kit — حماية يمكنك التحقق منها، لا وعود عليك تصديقها',
  },
  description: {
    en:
      'A client portal in React, TypeScript and Supabase. Per-client isolation is enforced in Postgres and proven by a sweep that breaks each protection on purpose to show a test catches it. 40 guards swept, 37 proven, 3 named.',
    ar:
      'بوابة عملاء مبنية بـ React و TypeScript و Supabase. عزل بيانات كل عميل مفروض داخل Postgres، ومُثبَت عبر sweep يكسر كل حماية عمدًا ليُظهر أن اختبارًا يكشفها. 40 حماية تم كسرها، 37 مُثبَتة، و3 مذكورة بالاسم.',
  },
  ogAlt: {
    en: 'Terminal output from the Client Portal Starter Kit guard sweep.',
    ar: 'مخرجات الطرفية من الـ guard sweep الخاص بـ Client Portal Starter Kit.',
  },
} satisfies Record<string, Copy>

/* ------------------------------------------------------------------- nav */

export const NAV = {
  brand: { en: 'Client Portal Starter Kit', ar: 'Client Portal Starter Kit' },
  brandShort: { en: 'CPSK', ar: 'CPSK' },
  skipToContent: { en: 'Skip to content', ar: 'تخطَّ إلى المحتوى' },
  links: [
    { href: '#proof', label: { en: 'The proof', ar: 'الإثبات' } },
    { href: '#included', label: { en: "What's included", ar: 'ما الذي تحصل عليه' } },
    { href: '#setup', label: { en: 'How you use it', ar: 'طريقة الاستخدام' } },
    { href: '#limits', label: { en: 'Limits', ar: 'الحدود' } },
    { href: '#pricing', label: { en: 'Pricing', ar: 'السعر' } },
  ],
} as const

/* ------------------------------------------------------- offer + promise */

export const OFFER = {
  buy: {
    en: `Buy — $${PRICE_USD}`,
    ar: `اشترِ الآن — ${PRICE_USD} دولارًا`,
  },
  buyAria: {
    en: `Buy the Client Portal Starter Kit for ${PRICE_USD} US dollars, one-time payment`,
    ar: `اشترِ Client Portal Starter Kit مقابل ${PRICE_USD} دولارًا أمريكيًا، دفعة واحدة`,
  },
  watch: { en: 'Watch the walkthrough', ar: 'شاهد الجولة الكاملة' },
  /**
   * Rendered under every single buy button. Written once, on purpose — the
   * button and the promise must not be able to drift apart.
   */
  guarantee: {
    en:
      'Run the guard sweep yourself. If any protection the documentation claims is proven turns out to have no test catching it, full refund within 14 days.',
    ar:
      'شغّل الـ guard sweep بنفسك. وإذا تبيّن أن أي حماية توثّقها المستندات على أنها «مُثبَتة» ليس لها اختبار واحد يكشف كسرها، فاسترداد كامل للمبلغ خلال 14 يومًا.',
  },
  checkoutPlaceholderNote: {
    en: 'Checkout link is a placeholder in this build and does not take payment.',
    ar: 'رابط الدفع في هذه النسخة مؤقت ولا يستقبل أي مدفوعات.',
  },
} satisfies Record<string, Copy>

/* ----------------------------------------------------------------- hero */

export const HERO = {
  h1Line1: { en: 'You were hired to build the feature.', ar: 'وظيفتك أن تبني الميزة.' },
  h1Line2: {
    en: 'Not to rebuild auth, roles, per-client isolation and file uploads first.',
    ar: 'لا أن تعيد بناء المصادقة والأدوار وعزل بيانات كل عميل ورفع الملفات قبلها.',
  },
  sub: {
    en:
      'A client portal in React, TypeScript and Supabase — admin dashboard, client portal, file uploads, invitations — where per-client isolation is enforced in Postgres, not filtered in your components. Runs on your own Supabase project, with your own empty database.',
    ar:
      'بوابة عملاء مبنية بـ React و TypeScript و Supabase — لوحة تحكم للمشرف، وبوابة للعميل، ورفع ملفات، ودعوات — حيث يُفرَض عزل بيانات كل عميل داخل Postgres نفسه، لا عبر فلترة في مكوّناتك. تعمل على مشروع Supabase الخاص بك، وبقاعدة بيانات فارغة تملكها.',
  },
  videoCaption: {
    en: 'Screen recording of the running application. No narration, no edits.',
    ar: 'تسجيل شاشة للتطبيق أثناء تشغيله. بلا تعليق صوتي وبلا مونتاج.',
  },
  videoUnsupported: {
    en: 'Your browser cannot play this video.',
    ar: 'متصفحك لا يستطيع تشغيل هذا الفيديو.',
  },
} satisfies Record<string, Copy>

/* ------------------------------------------------- §2 the differentiator */

export const DIFFERENTIATOR = {
  eyebrow: { en: 'The difference', ar: 'الفارق' },
  headingLine1: {
    en: '"Secure" is easy to write and hard to check.',
    ar: 'كلمة «آمن» سهلة الكتابة وصعبة التحقق.',
  },
  headingLine2: {
    en: 'So this template ships the check.',
    ar: 'لذلك يشحن هذا القالب أداة التحقق نفسها.',
  },
  body: {
    en: [
      'Most security in a template is an assertion. You read "RLS enabled", you believe it, and you find out whether it was true when a customer reads another customer\'s file.',
      'This template ships npm run test:sweep. It takes each protection in the database — every row-level policy, every column grant, every SECURITY DEFINER check, every trigger, the storage bucket rules — breaks it on purpose, runs the whole test suite against the broken database, records which tests turned red, then puts it back and confirms the suite is green again.',
      'A protection is proven here when breaking it makes a named test fail. Not when a test passes — a test can pass for the wrong reason, and this product has the receipt for that.',
    ],
    ar: [
      'الحماية في معظم القوالب مجرد ادّعاء. تقرأ «RLS enabled» فتصدّقها، ثم تكتشف إن كانت صحيحة أم لا يوم يقرأ عميلٌ ملفَّ عميل آخر.',
      'هذا القالب يشحن الأمر npm run test:sweep. يأخذ كل حماية في قاعدة البيانات — كل row-level policy، وكل column grant، وكل فحص SECURITY DEFINER، وكل trigger، وقواعد الـ storage bucket — ويكسرها عمدًا، ثم يشغّل مجموعة الاختبارات كاملة على قاعدة البيانات المكسورة، ويسجّل أي الاختبارات صارت حمراء، ثم يعيد الحماية ويتأكد أن المجموعة رجعت خضراء.',
      'الحماية تُعتبر «مُثبَتة» هنا حين يؤدي كسرها إلى فشل اختبار محدد بالاسم. لا حين ينجح اختبار — فالاختبار قد ينجح لسبب خاطئ، ولدى هذا المنتج دليل موثّق على ذلك.',
    ],
  },
  terminalLabel: {
    en: 'Captured output — npm run test:sweep, real run',
    ar: 'مخرجات مُلتقَطة — npm run test:sweep، تشغيل حقيقي',
  },
  terminalSourceNote: {
    en: 'Excerpt. Full run: demo-assets/terminal/full-sweep.txt',
    ar: 'مقتطف. التشغيل الكامل: demo-assets/terminal/full-sweep.txt',
  },

  greenSuiteHeading: {
    en: 'The run where a green suite proved nothing',
    ar: 'المرة التي لم تُثبِت فيها مجموعة اختبارات خضراء أي شيء',
  },
  greenSuiteBody: {
    en: [
      'The sharpest guard in the product is the is_admin() check inside set_user_role. That function runs with owner privileges and any signed-in user can call it, so that one check is the entire distance between a client and making themselves an admin.',
      'Deleting it used to turn nothing red. Every test still passed. A second layer — the prevent_role_change trigger — caught the write and raised the same error code with the same wording, so the test asserting "the call was refused" passed on a guard it was not testing.',
      'The fix was to give each layer a distinct error and assert the specific one. Breaking that check now turns exactly two tests red. That difference — from 0 to 2 — is the whole reason to run a sweep instead of trusting a green suite.',
    ],
    ar: [
      'أحدّ حماية في المنتج هي فحص is_admin() داخل set_user_role. هذه الدالة تعمل بصلاحيات المالك، وأي مستخدم مسجَّل يستطيع استدعاءها، فيكون ذلك الفحص وحده هو كامل المسافة بين عميل عادي وبين أن يرقّي نفسه إلى مشرف.',
      'حذف هذا الفحص كان لا يُحوِّل أي اختبار إلى الأحمر. كل الاختبارات كانت تنجح. طبقة ثانية — الـ trigger المسمّى prevent_role_change — كانت تلتقط الكتابة وترفع الخطأ نفسه بالصياغة نفسها، فكان الاختبار الذي يؤكد «أن الاستدعاء رُفض» ينجح على حماية لم يكن يختبرها أصلًا.',
      'الحل كان إعطاء كل طبقة رسالة خطأ مميزة والتحقق من الرسالة المحددة. كسر ذلك الفحص الآن يُحوِّل اختبارين بالضبط إلى الأحمر. هذا الفرق — من صفر إلى اثنين — هو السبب الكامل لتشغيل sweep بدل الثقة في مجموعة خضراء.',
    ],
  },

  namingHeading: {
    en: 'The three that could not be proven alone',
    ar: 'الثلاثة التي تعذّر إثباتها منفردة',
  },
  namingBody: {
    en: [
      'Three of the forty could not be proven on their own, and the sweep prints them by name rather than rounding 37 up to 40.',
      'Each sits behind another guard that refuses first, so breaking it alone changes nothing you can observe. policy:profiles/update is unreachable while the SELECT policy holds, because an UPDATE ... WHERE has to find the row before it can change it. policy:storage/update is unreachable while INSERT holds, because an upsert is checked against INSERT too and INSERT refuses first. trigger:prevent_role_change is never consulted, because UPDATE(role) is not granted to authenticated and the write dies at the privilege check.',
      'That is what defence in depth looks like from the inside — and it is indistinguishable from dead code unless you check. So the sweep also breaks each one together with the layer that shadows it. Those runs are in the proven column. What stays untested is each one alone, and that is what the number 37 means.',
    ],
    ar: [
      'ثلاث حمايات من الأربعين تعذّر إثباتها منفردة، والـ sweep يطبعها بالاسم بدل تقريب 37 إلى 40.',
      'كل واحدة منها تقع خلف حماية أخرى ترفض أولًا، فكسرها وحدها لا يغيّر شيئًا يمكن ملاحظته. الحماية policy:profiles/update لا يمكن الوصول إليها ما دامت سياسة SELECT قائمة، لأن أي UPDATE ... WHERE يجب أن يعثر على الصف قبل أن يعدّله. والحماية policy:storage/update لا يمكن الوصول إليها ما دامت INSERT قائمة، لأن عملية upsert تُفحص أمام INSERT أيضًا، وINSERT ترفض أولًا. أما trigger:prevent_role_change فلا يُستدعى أصلًا، لأن صلاحية UPDATE(role) غير ممنوحة لدور authenticated، فتموت الكتابة عند فحص الصلاحيات.',
      'هكذا يبدو الدفاع المتعدد الطبقات من الداخل — ولا يمكن تمييزه عن كود ميّت ما لم تتحقق. لذلك يكسر الـ sweep كل واحدة منها مع الطبقة التي تحجبها. تلك التشغيلات مُدرجة في عمود «مُثبَتة». ما يبقى غير مُختبَر هو كل واحدة منها بمفردها، وهذا بالضبط ما يعنيه الرقم 37.',
    ],
  },

  closing: {
    en:
      'Forty broken on purpose, thirty-seven caught, three named. Buy it and run the sweep yourself — that is what the guarantee is for.',
    ar:
      'أربعون حماية كُسرت عمدًا، سبع وثلاثون التقطتها الاختبارات، وثلاث ذُكرت بالاسم. اشترِه وشغّل الـ sweep بنفسك — لهذا وُجد الضمان.',
  },
} satisfies Record<string, Copy | CopyList>

/**
 * Verbatim excerpt of a real run. Not reflowed, not translated, not
 * prettified — this is the file's bytes. Source:
 * demo-assets/terminal/full-sweep.txt (lines 6, 8, 16-20, 198-203).
 */
export const SWEEP_EXCERPT = `Guard sweep: 40 guards

Baseline: 61 tests, all passing.

  policy:client_records/select ... 3 test(s) turned red:
      RED  client A cannot read client B records — unfiltered select returns only their own
      RED  client A cannot read client B's record by its exact id
      RED  a deactivated client can still sign in but reads nothing
      restored -> suite green again (61/61)

37/40 guards proven.

UNTESTED GUARDS (3):
  - policy:profiles/update: clients could edit anyone's profile
  - policy:storage/update: clients could overwrite files
  - trigger:prevent_role_change: the old-vs-new role comparison removed`
