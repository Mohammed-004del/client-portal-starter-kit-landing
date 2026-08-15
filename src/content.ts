import { PRICE_USD, RUNS } from './config'

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
/**
 * WCAG 2.5.3: an accessible name must contain the visible label, so someone
 * using voice control can say what they can see. Each of these opens with the
 * visible text verbatim.
 */
export const LOCALE_SWITCH_ARIA: Copy = {
  en: 'العربية — switch to Arabic',
  ar: 'English — التبديل إلى الإنجليزية',
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
  /** Describes hero-poster.webp, which is the client portal — not the sweep. */
  ogAlt: {
    en: "The client portal in the Client Portal Starter Kit, showing one client's records.",
    ar: 'بوابة العميل في Client Portal Starter Kit، وهي تعرض سجلات عميل واحد.',
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
    // A different page, not an anchor. Last on purpose: it is the exit for
    // someone who is not buying today, and it must not outrank the sections
    // that answer why they would.
    { href: '/guide', label: { en: 'Free guide', ar: 'دليل مجاني' } },
  ],
} as const

/* ------------------------------------------------------- offer + promise */

export const OFFER = {
  buy: {
    en: `Buy — $${PRICE_USD}`,
    ar: `اشترِ الآن — ${PRICE_USD} دولارًا`,
  },
  /** Opens with the button's visible text verbatim — see LOCALE_SWITCH_ARIA. */
  buyAria: {
    en: `Buy — $${PRICE_USD}. Client Portal Starter Kit, one-time payment.`,
    ar: `اشترِ الآن — ${PRICE_USD} دولارًا. Client Portal Starter Kit، دفعة واحدة.`,
  },
  watch: { en: 'Watch the walkthrough', ar: 'شاهد الجولة الكاملة' },
  /**
   * A guarantee nobody can name is a guarantee nobody repeats. This is the
   * handle for the promise below it, and it is rendered by the same component,
   * so the name can never end up attached to different terms than these.
   */
  guaranteeName: {
    en: 'The Broken-Guard Guarantee',
    ar: 'ضمان الحماية المكسورة',
  },
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

/** A labelled item in a list — a table and what it answers, a step, a question. */
export type CopyPair = { readonly term: Copy; readonly desc: Copy }

/**
 * A number that was counted, with what it was counted from. Deliberately not
 * general-purpose: there is no field here for a unit of time, because nothing
 * on this page is allowed to estimate how long anything would have taken.
 */
export type Counted = { readonly n: string; readonly label: Copy; readonly note: Copy }

/** A captured PNG, with its real pixel dimensions. */
export type Screenshot = {
  readonly file: string
  readonly w: number
  readonly h: number
  readonly label: Copy
}

/* ------------------------------------------------------- §1 the problem */

export const PROBLEM = {
  eyebrow: { en: 'The problem', ar: 'المشكلة' },
  heading: {
    en: 'The boring part is the part that has to be right.',
    ar: 'الجزء الممل هو الجزء الذي يجب أن يكون صحيحًا.',
  },
  body: {
    en: [
      'A client portal is never the job. The job is the thing the portal is for — the invoices, the sessions, the case files, whatever the business actually asked you to build. The portal is what has to exist first.',
      'And the part in front of it is the same every time: sign-in, an admin who sees everything, a client who sees only their own, an invitation flow, uploads that land somewhere private, a record of who did what. None of it is interesting. All of it is the part that is embarrassing to get wrong.',
      'The specific way it goes wrong is quiet. You filter by the signed-in user in your query, it works, you ship it. The filter was in your component, not in the database — so the day a query forgets the where clause, or a new endpoint reads the table directly, one client reads another client\'s file. Nothing crashed. No test failed. You find out from the customer.',
    ],
    ar: [
      'بوابة العملاء ليست المهمة أبدًا. المهمة هي ما وُجدت البوابة من أجله — الفواتير، أو الجلسات، أو ملفات القضايا، أو أيًّا كان ما طلب منك العمل بناءه فعلًا. البوابة هي ما يجب أن يوجد أولًا.',
      'وما يسبقها هو نفسه في كل مرة: تسجيل دخول، ومشرف يرى كل شيء، وعميل لا يرى إلا ما يخصه، ومسار دعوات، ورفع ملفات تستقر في مكان خاص، وسجل لمن فعل ماذا. لا شيء من هذا مثير للاهتمام. وكله الجزء الذي يكون الخطأ فيه محرجًا.',
      'والطريقة التي يقع بها الخطأ هادئة. تُرشِّح النتائج حسب المستخدم المسجَّل داخل الاستعلام، فتعمل، فتشحن. لكن الترشيح كان في مكوّنك أنت لا في قاعدة البيانات — فيوم ينسى استعلامٌ شرط where، أو يقرأ مسارٌ جديد الجدول مباشرة، يقرأ عميلٌ ملفَّ عميل آخر. لم يتعطّل شيء. ولم يفشل أي اختبار. وتعرف بالأمر من العميل نفسه.',
    ],
  },
  closing: {
    en:
      'This template is the boring part, finished — and, more to the point, the boring part with the receipts that say it is finished.',
    ar:
      'هذا القالب هو الجزء الممل وقد اكتمل — والأهم أنه الجزء الممل ومعه ما يُثبت أنه اكتمل فعلًا.',
  },
} satisfies Record<string, Copy | CopyList>

/* ------------------------------------------- §3 enforced in the database */

export const ENFORCEMENT = {
  eyebrow: { en: 'Where it is enforced', ar: 'أين تُفرَض الحماية' },
  heading: {
    en: 'Filtering in the app is a preference. Enforcing in the database is a rule.',
    ar: 'الترشيح داخل التطبيق تفضيل. أما الفرض داخل قاعدة البيانات فقاعدة.',
  },
  intro: {
    en: [
      'If your components decide who sees what, then every future query is a chance to forget. The check lives in one place and has to be repeated everywhere, correctly, forever, by everyone who joins the project after you.',
      'Here the check lives in Postgres. Row-level security policies mean the table itself refuses. Your query does not need a where clause to be safe — it needs one to be tidy. Forget it and you get your own rows back anyway, because the database will not hand over anything else.',
    ],
    ar: [
      'إن كانت مكوّناتك هي التي تقرر من يرى ماذا، فكل استعلام قادم فرصة للنسيان. يعيش الفحص في مكان واحد، ويجب تكراره في كل مكان، بشكل صحيح، وإلى الأبد، ومن كل من ينضم للمشروع بعدك.',
      'هنا يعيش الفحص داخل Postgres. سياسات row-level security تعني أن الجدول نفسه هو من يرفض. استعلامك لا يحتاج شرط where لكي يكون آمنًا — بل يحتاجه لكي يكون مرتبًا. انسَه، وستستعيد صفوفك أنت فحسب، لأن قاعدة البيانات لن تسلّم أي شيء آخر.',
    ],
  },

  claim1Label: { en: 'Claim 1 — the database', ar: 'الادّعاء الأول — قاعدة البيانات' },
  claim1Heading: {
    en: 'Same query, two identities, different row counts.',
    ar: 'الاستعلام نفسه، هويّتان، وعدد صفوف مختلف.',
  },
  claim1Body: {
    en: [
      'The security suite runs one identical query twice — once as a signed-in client, once as an admin. The client gets zero rows. The admin gets all of them. No filter changed between the two runs; only who was asking.',
      'That is a test, so it can be broken on purpose. When the sweep drops that policy, this is what the run prints:',
    ],
    ar: [
      'مجموعة اختبارات الأمان تشغّل استعلامًا واحدًا متطابقًا مرتين — مرة بهوية عميل مسجَّل، ومرة بهوية مشرف. العميل يحصل على صفر صفوف. والمشرف يحصل عليها كلها. لم يتغيّر أي مرشّح بين التشغيلين؛ تغيّر السائل فقط.',
      'وبما أن ذلك اختبار، فيمكن كسره عمدًا. وحين يُسقِط الـ sweep تلك السياسة، هذا ما يطبعه التشغيل:',
    ],
  },
  claim1TerminalLabel: {
    en: 'Captured output — npm run test:sweep, real run',
    ar: 'مخرجات مُلتقَطة — npm run test:sweep، تشغيل حقيقي',
  },
  claim1TerminalNote: {
    en: 'Verbatim, demo-assets/terminal/full-sweep.txt lines 43–46.',
    ar: 'نصًّا كما هو، من demo-assets/terminal/full-sweep.txt الأسطر 43–46.',
  },

  claim2Label: { en: 'Claim 2 — the route guard', ar: 'الادّعاء الثاني — حارس المسار' },
  claim2Heading: {
    en: 'And the front end sends them back — which is convenience, not security.',
    ar: 'والواجهة الأمامية تعيده أدراجه — وهذه راحة استخدام، لا حماية.',
  },
  claim2Body: {
    en: [
      'A signed-in client who types /admin into the address bar is redirected to their own portal. Below are two photographs of a real browser window, address bar included, taken by hand — the first with /admin typed, the second where the browser ended up.',
      'This is a frontend route guard and nothing more. It exists so a client never sees a broken admin screen. It is not what keeps their data safe, and it should not be read as if it were: anyone can disable JavaScript, and an API client never loads your routes at all.',
    ],
    ar: [
      'العميل المسجَّل الذي يكتب ‎/admin‎ في شريط العنوان يُعاد توجيهه إلى بوابته هو. وفي الأسفل صورتان حقيقيتان لنافذة متصفح، بشريط العنوان، التُقطتا يدويًا — الأولى وقد كُتب فيها ‎/admin‎، والثانية حيث انتهى المتصفح.',
      'هذا حارس مسار في الواجهة الأمامية ولا شيء غير ذلك. وُجد لكي لا يرى العميل شاشة مشرف مكسورة. وهو ليس ما يحفظ بياناته، ولا ينبغي قراءته كما لو كان كذلك: أي أحد يستطيع تعطيل JavaScript، وعميل API لا يحمّل مساراتك أصلًا.',
    ],
  },
  shot1Caption: {
    en: 'Real browser window. /admin typed in the address bar, signed in as client-a@example.com.',
    ar: 'نافذة متصفح حقيقية. كُتب ‎/admin‎ في شريط العنوان، والجلسة باسم client-a@example.com.',
  },
  shot2Caption: {
    en: 'The same window after the redirect. The address bar now reads /portal.',
    ar: 'النافذة نفسها بعد إعادة التوجيه. شريط العنوان يقرأ الآن ‎/portal‎.',
  },

  closing: {
    en:
      'Delete the route guard entirely and the client still reads zero rows, because the refusal was never in the front end. That is the whole argument — the screenshots are only the part you can see.',
    ar:
      'احذف حارس المسار بالكامل، وسيظل العميل يقرأ صفر صفوف، لأن الرفض لم يكن في الواجهة الأمامية قط. هذه هي الحجّة كاملة — والصور ليست إلا الجزء الذي يمكنك رؤيته.',
  },
} satisfies Record<string, Copy | CopyList>

/** Verbatim. demo-assets/terminal/full-sweep.txt, lines 43-46. */
export const TWO_IDENTITY_EXCERPT = `  policy:activity_log/select ... 2 test(s) turned red:
      RED  same query, two identities: client reads zero rows, admin reads all of them
      RED  a deactivated admin loses admin powers, not just the login button
      restored -> suite green again (61/61)`

/* ------------------------------------------------- §4 what's in the box */

export const INCLUDED = {
  eyebrow: { en: "What's included", ar: 'ما الذي تحصل عليه' },
  heading: {
    en: 'Four tables, and a question each one answers.',
    ar: 'أربعة جداول، ولكل واحد منها سؤال يجيب عنه.',
  },
  intro: {
    en:
      'The schema is deliberately small. Four tables, eight numbered migration files, and comments in the SQL explaining why each decision went the way it did rather than what the line does.',
    ar:
      'المخطَّط صغير عن قصد. أربعة جداول، وثمانية ملفات migration مرقّمة، وتعليقات داخل الـ SQL تشرح لماذا اتُّخذ كل قرار على هذا النحو، لا ماذا يفعل السطر.',
  },
  tables: [
    {
      term: { en: 'profiles', ar: 'profiles' },
      desc: {
        en: 'Who is this person, and what are they allowed to do? One row per auth user, sharing its id so auth.uid() compares directly with no join. role is the source of truth for authorisation and defaults to client, never admin.',
        ar: 'من هذا الشخص، وما المسموح له بفعله؟ صف واحد لكل مستخدم في auth، يتشارك معه المعرّف نفسه ليقارَن auth.uid() مباشرة بلا join. والحقل role هو مصدر الحقيقة للصلاحيات، وقيمته الافتراضية client، وليست admin أبدًا.',
      },
    },
    {
      term: { en: 'client_records', ar: 'client_records' },
      desc: {
        en: 'What does the business manage on behalf of this client? The generic table you are meant to rename — to invoices, sessions, orders, tickets — and reshape. client_id is the ownership column every client-facing policy resolves against.',
        ar: 'ما الذي تديره الشركة نيابةً عن هذا العميل؟ هو الجدول العام الذي يُفترض أن تعيد تسميته — إلى invoices أو sessions أو orders أو tickets — وتعيد تشكيله. والعمود client_id هو عمود الملكية الذي تنتهي إليه كل سياسة موجَّهة للعميل.',
      },
    },
    {
      term: { en: 'attachments', ar: 'attachments' },
      desc: {
        en: 'Which file belongs to which record? Points at an object key inside a private storage bucket. The path is UNIQUE, because two rows pointing at one object means deleting either one orphans or double-frees the file.',
        ar: 'أي ملف يخصّ أي سجل؟ يشير إلى مفتاح كائن داخل storage bucket خاص. والمسار UNIQUE، لأن صفّين يشيران إلى كائن واحد يعني أن حذف أيٍّ منهما إما يُيتّم الملف أو يحرّره مرتين.',
      },
    },
    {
      term: { en: 'activity_log', ar: 'activity_log' },
      desc: {
        en: 'Who did what, and does the record survive them leaving? actor_id is ON DELETE SET NULL, never CASCADE — an audit trail that disappears along with its subject is not an audit trail.',
        ar: 'من فعل ماذا، وهل يبقى السجل بعد رحيله؟ الحقل actor_id مضبوط على ON DELETE SET NULL، لا CASCADE أبدًا — فسجل تدقيق يختفي مع صاحبه ليس سجل تدقيق.',
      },
    },
  ],
  restHeading: { en: 'And the application on top of it', ar: 'والتطبيق المبني فوقها' },
  rest: [
    {
      term: { en: 'Admin dashboard', ar: 'لوحة تحكم المشرف' },
      desc: {
        en: 'Client list with search, client detail, record detail, create and edit, and a confirm step before anything destructive.',
        ar: 'قائمة عملاء مع بحث، وصفحة تفصيل للعميل، وصفحة تفصيل للسجل، وإنشاء وتعديل، وخطوة تأكيد قبل أي إجراء مُتلِف.',
      },
    },
    {
      term: { en: 'Client portal', ar: 'بوابة العميل' },
      desc: {
        en: 'The same data from the other side: the records shared with that client, each record in detail, and their own profile.',
        ar: 'البيانات نفسها من الجهة الأخرى: السجلات المشاركة مع ذلك العميل، وكل سجل بتفاصيله، وملفه الشخصي.',
      },
    },
    {
      term: { en: 'File uploads', ar: 'رفع الملفات' },
      desc: {
        en: 'Admin-side upload into a private bucket, with size and type enforced by the bucket rather than by the browser. Clients download; client-side upload is not enabled by default and the docs say what turning it on involves.',
        ar: 'الرفع من جهة المشرف إلى bucket خاص، مع فرض الحجم والنوع من الـ bucket نفسه لا من المتصفح. العملاء يُنزِّلون فقط؛ والرفع من جهة العميل غير مُفعَّل افتراضيًا، والتوثيق يشرح ما يتطلبه تفعيله.',
      },
    },
    {
      term: { en: 'Invitations', ar: 'الدعوات' },
      desc: {
        en: 'An invite-client Edge Function — the only code in the product that holds the service key, kept off the browser on purpose. There is no public sign-up.',
        ar: 'دالة Edge باسم invite-client — وهي الكود الوحيد في المنتج الذي يحمل مفتاح الخدمة، ومُبعَد عن المتصفح عن قصد. ولا يوجد تسجيل عام مفتوح.',
      },
    },
    {
      term: { en: 'Tests', ar: 'الاختبارات' },
      desc: {
        en: '61 security tests across 7 files, 9 browser smoke tests, and the guard sweep itself.',
        ar: '61 اختبار أمان موزّعة على 7 ملفات، و9 اختبارات متصفح سريعة، والـ guard sweep نفسه.',
      },
    },
    {
      term: { en: 'Documentation', ar: 'التوثيق' },
      desc: {
        en: 'SECURITY.md — threat model, guarantees and limits. SWEEP_RESULTS.md — which protections are proven and which are not. EVIDENCE.md — what each phase demonstrated, with the numbers. DEPLOYMENT.md — going live, including the exact SQL for promoting your first admin. LEARNING_NOTES.md — how it works, and answers you can forward to your own client.',
        ar: 'ملف SECURITY.md — نموذج التهديد والضمانات والحدود. وSWEEP_RESULTS.md — أي الحمايات مُثبَتة وأيها ليست كذلك. وEVIDENCE.md — ما أثبتته كل مرحلة، بالأرقام. وDEPLOYMENT.md — النشر للإنتاج، ومعه أمر SQL المحدد لترقية أول مشرف. وLEARNING_NOTES.md — كيف يعمل، وإجابات يمكنك إرسالها إلى عميلك.',
      },
    },
  ],
} satisfies {
  eyebrow: Copy
  heading: Copy
  intro: Copy
  tables: readonly CopyPair[]
  restHeading: Copy
  rest: readonly CopyPair[]
}

/* ------------------------------------------------------ §5 how you use it */

export const SETUP = {
  eyebrow: { en: 'How you use it', ar: 'طريقة الاستخدام' },
  heading: {
    en: 'Clone it, point it at your own Supabase, rename one table, build your feature.',
    ar: 'انسخه، ووجّهه إلى Supabase الخاص بك، وأعد تسمية جدول واحد، ثم ابنِ ميزتك.',
  },
  intro: {
    en: [
      'There is no installer and no setup script — five commands, and two values you paste into a .env file. This is the real sequence from the README, not a shortened version of it.',
      'You need Node 20.19 or newer, and Docker running if you want the local stack. The Supabase CLI starts Postgres, Auth and Storage as containers on your own machine.',
    ],
    ar: [
      'لا يوجد مُثبِّت ولا سكربت إعداد — خمسة أوامر، وقيمتان تلصقهما في ملف ‎.env‎. هذا هو التسلسل الحقيقي كما في الـ README، لا نسخة مختصرة منه.',
      'تحتاج Node بإصدار 20.19 أو أحدث، وDocker قيد التشغيل إن أردت البيئة المحلية. أداة Supabase CLI تشغّل Postgres وAuth وStorage كحاويات على جهازك أنت.',
    ],
  },
  commandsLabel: {
    en: 'From the product README — local, from clone to running app',
    ar: 'من README الخاص بالمنتج — محليًا، من النسخ إلى تطبيق يعمل',
  },
  commandsNote: {
    en: 'Verbatim, README.md "Local, from clone to running app".',
    ar: 'نصًّا كما هو، من README.md قسم «Local, from clone to running app».',
  },
  afterHeading: { en: 'Then it is yours', ar: 'وبعدها يصير لك' },
  after: {
    en: [
      'Rebranding is one file. Tailwind v4 has no JavaScript config, so every design token lives in src/styles/theme.css — change it there and the whole product follows.',
      'client_records is named the way it is because you are meant to rename it. The README has a section on doing exactly that, and another on adding a third role, because those are the two changes almost everyone makes.',
      'You run it on your own infrastructure. Your own Supabase project, your own bucket, your own auth. Nothing here depends on a service of mine staying online.',
    ],
    ar: [
      'إعادة العلامة التجارية ملف واحد. فـ Tailwind v4 بلا إعدادات JavaScript، وكل رموز التصميم تعيش في src/styles/theme.css — غيّرها هناك ويتبعها المنتج كله.',
      'اسم client_records على هذا النحو لأنه يُفترض أن تعيد تسميته. وفي الـ README قسم مخصص لفعل ذلك بالضبط، وآخر لإضافة دور ثالث، لأنهما التغييران اللذان يجريهما الجميع تقريبًا.',
      'أنت تشغّله على بنيتك التحتية أنت. مشروع Supabase الخاص بك، وbucket الخاص بك، ومصادقة خاصة بك. ولا شيء هنا يعتمد على بقاء خدمة تخصّني تعمل.',
    ],
  },
  emptyDbHeading: { en: 'Your database arrives empty', ar: 'قاعدة بياناتك تصلك فارغة' },
  emptyDbBody: {
    en: [
      'On a fresh deployment there are no clients, no records, no files — every count at zero. That is intentional, not a missed step, and the empty states are written to read as deliberate.',
      'The seed file that creates admin@example.com and three test clients is a local development tool. supabase db push deliberately does not run it, because a published portal with a known admin password is not a portal.',
      'One consequence to know in advance: you will sign up on your own fresh deployment and land as a client, locked out of the admin area. That is the trigger that stops strangers promoting themselves, and it does not make an exception for you. Promoting your first admin is a one-minute step with exact SQL in the deployment docs.',
    ],
    ar: [
      'في أي نشر جديد لن تجد عملاء ولا سجلات ولا ملفات — كل العدّادات على صفر. هذا مقصود، وليس خطوة فائتة، والحالات الفارغة مكتوبة لتُقرأ كقرار لا كعطل.',
      'ملف الـ seed الذي ينشئ admin@example.com وثلاثة عملاء تجريبيين هو أداة تطوير محلية. والأمر supabase db push لا يشغّله عمدًا، لأن بوابة منشورة بكلمة مرور مشرف معروفة ليست بوابة.',
      'ونتيجة واحدة يُحسن معرفتها مسبقًا: ستسجّل حسابك على نشرك الجديد فتهبط كعميل، محجوبًا عن منطقة المشرف. ذلك هو الـ trigger الذي يمنع الغرباء من ترقية أنفسهم، وهو لا يستثنيك أنت. وترقية أول مشرف خطوة من دقيقة واحدة، بأمر SQL محدد في توثيق النشر.',
    ],
  },
} satisfies Record<string, Copy | CopyList>

/** Verbatim. Product README.md, "Local, from clone to running app". */
export const SETUP_COMMANDS = `git clone <your-repo> client-portal && cd client-portal
npm install

# 1. Start the database, auth and storage. First run pulls images — a few minutes.
npx supabase start

# 2. Point the app at it. Copy the URL and anon key that \`supabase start\` printed.
cp .env.example .env          # then fill in the two values

# 3. Load the schema and the four seeded users.
npx supabase db reset

# 4. Run it.
npm run dev`

/* ------------------------------------------------------- §6 what it is not */

export const LIMITS = {
  eyebrow: { en: 'The limits', ar: 'الحدود' },
  heading: {
    en: 'What this is not. Read it now rather than in month two.',
    ar: 'ما ليس هذا المنتج. اقرأه الآن، لا في الشهر الثاني.',
  },
  intro: {
    en:
      'Every one of these is in the product documentation, most of them in the first section rather than a footnote at the end. They are here for the same reason: a limit you know about is a design decision, and a limit you discover is a bug.',
    ar:
      'كل بند من هذه البنود موجود في توثيق المنتج، ومعظمها في القسم الأول لا في حاشية أخيرة. وهي هنا للسبب نفسه: الحدّ الذي تعرفه قرارُ تصميم، والحدّ الذي تكتشفه عطل.',
  },
  items: [
    {
      term: { en: 'No hard delete', ar: 'لا حذف نهائي' },
      desc: {
        en: 'Clients are deactivated, never removed, because deleting one cascades through their records and attachments and leaves the audit trail pointing at things that no longer exist. The direct consequence: there is no "erase everything about me" button. If you owe anyone a right to erasure, that is work you will plan and build.',
        ar: 'العملاء يُعطَّلون ولا يُحذفون، لأن حذف عميل يتسلسل إلى سجلاته ومرفقاته ويترك سجل التدقيق يشير إلى أشياء لم تعد موجودة. والنتيجة المباشرة: لا يوجد زر «امسح كل شيء عني». وإن كان عليك التزام بحق المحو تجاه أحد، فهذا عمل ستخطط له وتبنيه.',
      },
    },
    {
      term: { en: 'No two-factor authentication', ar: 'لا مصادقة ثنائية' },
      desc: {
        en: 'The database enforces what an admin may do; it does not enforce who gets to be one. An admin account is a master key. Supabase supports MFA and turning it on is your work.',
        ar: 'قاعدة البيانات تفرض ما يجوز للمشرف فعله؛ لكنها لا تفرض من يصير مشرفًا. وحساب المشرف مفتاح رئيسي. وSupabase يدعم MFA، وتفعيله عملك أنت.',
      },
    },
    {
      term: { en: 'Not multi-tenant', ar: 'ليس متعدد المستأجرين' },
      desc: {
        en: 'There is no organisation or tenant column anywhere in the schema. One deployment serves one business with many clients — not many businesses sharing one database. Adding that is a schema change, not a setting.',
        ar: 'لا يوجد عمود لمؤسسة أو مستأجر في أي مكان من المخطَّط. النشر الواحد يخدم شركة واحدة لها عملاء كثيرون — لا شركات كثيرة تتشارك قاعدة بيانات واحدة. وإضافة ذلك تغييرٌ في المخطَّط، لا إعداد يُضبط.',
      },
    },
    {
      term: { en: 'New tables you add are not protected', ar: 'الجداول التي تضيفها لاحقًا غير محمية' },
      desc: {
        en: 'A new table arrives with row-level security switched off, silently, and your own testing will not catch it — because your app\'s filter works, which is not the same as the database refusing anything. The docs name this as the single most likely way to introduce a leak into a template that had none.',
        ar: 'الجدول الجديد يأتي وrow-level security مُطفأ عليه، في صمت، ولن يكشف ذلك اختبارك أنت — لأن مرشّح تطبيقك يعمل، وهذا ليس كرفض قاعدة البيانات لشيء. والتوثيق يسمّي هذا أرجح طريقة لإدخال تسريب إلى قالب لم يكن فيه تسريب.',
      },
    },
    {
      term: { en: 'No client-side uploads by default', ar: 'لا رفع من جهة العميل افتراضيًا' },
      desc: {
        en: 'Clients download files; they do not upload them. Enabling it is deliberate work rather than a config flag, and the docs describe what it involves — that bucket holds every client\'s documents.',
        ar: 'العملاء ينزّلون الملفات ولا يرفعونها. وتفعيل الرفع عملٌ مقصود لا مفتاح إعدادات، والتوثيق يصف ما يتطلبه — فذلك الـ bucket يحمل مستندات كل العملاء.',
      },
    },
    {
      term: { en: 'No CMS, no e-commerce, no AI, no mobile app', ar: 'لا CMS ولا متجر ولا ذكاء اصطناعي ولا تطبيق جوال' },
      desc: {
        en: 'There is no content editor, no cart, no payments, no model calls, and no React Native project. It is a web application: an admin side, a client side, and the schema underneath. The complete file tree is published in the README, so what is absent is as checkable as what is present.',
        ar: 'لا محرر محتوى، ولا سلة شراء، ولا مدفوعات، ولا استدعاءات نماذج، ولا مشروع React Native. هو تطبيق ويب: جهة مشرف، وجهة عميل، والمخطَّط تحتهما. وشجرة الملفات كاملة منشورة في الـ README، فما هو غائب قابل للتحقق تمامًا كما هو حاضر.',
      },
    },
  ],
  closing: {
    en:
      'None of that is an apology. A template that claims everything is a template nobody checked.',
    ar:
      'لا شيء من ذلك اعتذار. فالقالب الذي يدّعي كل شيء قالب لم يتحقق منه أحد.',
  },
} satisfies {
  eyebrow: Copy
  heading: Copy
  intro: Copy
  items: readonly CopyPair[]
  closing: Copy
}

/* --------------------------------------------------------- §7 screenshots */

export const SCREENS = {
  eyebrow: { en: 'The product', ar: 'المنتج' },
  heading: { en: 'The walkthrough, and every screen in it.', ar: 'الجولة الكاملة، وكل شاشة فيها.' },
  intro: {
    en:
      'Recorded from the local application running against a real Postgres with seeded data — one admin, three clients, six records, three uploaded files. Nothing was captured from a production deployment, and nothing here is a mockup.',
    ar:
      'مُسجَّل من التطبيق المحلي وهو يعمل على Postgres حقيقي ببيانات مزروعة — مشرف واحد، وثلاثة عملاء، وستة سجلات، وثلاثة ملفات مرفوعة. لم يُلتقط شيء من نشر إنتاجي، ولا شيء هنا نموذج تخيّلي.',
    },
  gridHeading: { en: 'Every screen, in walkthrough order', ar: 'كل الشاشات، بترتيب الجولة' },
  mobileHeading: { en: 'The same product on a phone', ar: 'المنتج نفسه على الهاتف' },
  /**
   * `file` is the stem of a PNG in public/assets/screenshots/, and w/h are that
   * file's real pixel dimensions (captured at 2x) so the browser can reserve
   * the right space before the image arrives — without them these lazy images
   * collapse to zero height and shift the page as they load.
   *
   * Labels name the screen only. They make no claim about behaviour the image
   * cannot show.
   */
  shots: [
    { file: '01-login', w: 2880, h: 1800, label: { en: 'Sign in', ar: 'تسجيل الدخول' } },
    { file: '02-admin-dashboard', w: 2880, h: 2522, label: { en: 'Admin — dashboard', ar: 'المشرف — لوحة التحكم' } },
    { file: '03-admin-clients-list', w: 2880, h: 1800, label: { en: 'Admin — client list', ar: 'المشرف — قائمة العملاء' } },
    { file: '04-admin-clients-search', w: 2880, h: 1800, label: { en: 'Admin — client search', ar: 'المشرف — البحث عن عميل' } },
    { file: '05-admin-client-detail', w: 2880, h: 2760, label: { en: 'Admin — client detail', ar: 'المشرف — تفاصيل العميل' } },
    { file: '06-admin-record-detail', w: 2880, h: 1800, label: { en: 'Admin — record detail', ar: 'المشرف — تفاصيل السجل' } },
    { file: '07-admin-delete-confirm', w: 2880, h: 1800, label: { en: 'Admin — confirm before deleting', ar: 'المشرف — تأكيد قبل الحذف' } },
    { file: '08-admin-invite-dialog', w: 2880, h: 1800, label: { en: 'Admin — invite a client', ar: 'المشرف — دعوة عميل' } },
    { file: '09-portal-records', w: 2880, h: 1800, label: { en: 'Portal — records', ar: 'البوابة — السجلات' } },
    { file: '10-portal-record-detail', w: 2880, h: 1800, label: { en: 'Portal — record detail', ar: 'البوابة — تفاصيل السجل' } },
    { file: '11-portal-profile', w: 2880, h: 2694, label: { en: 'Portal — profile', ar: 'البوابة — الملف الشخصي' } },
  ],
  /** Portrait captures — shown narrow so they read as phone screens. */
  mobileShots: [
    { file: '12-mobile-client-detail', w: 780, h: 4462, label: { en: 'Mobile — client detail, full page', ar: 'الجوال — تفاصيل العميل، الصفحة كاملة' } },
    { file: '13-mobile-portal', w: 780, h: 1688, label: { en: 'Mobile — portal', ar: 'الجوال — البوابة' } },
  ],
} satisfies {
  eyebrow: Copy
  heading: Copy
  intro: Copy
  gridHeading: Copy
  mobileHeading: Copy
  shots: readonly Screenshot[]
  mobileShots: readonly Screenshot[]
}

/* ---------------------------------------------------------- §8 tech stack */

export const STACK = {
  eyebrow: { en: 'The stack', ar: 'التقنيات' },
  heading: { en: 'Nothing exotic, and nothing you have to learn first.', ar: 'لا شيء غريب، ولا شيء عليك تعلّمه أولًا.' },
  intro: {
    en:
      'Versions below are the ones in the product\'s own package.json. The choices are boring on purpose — the interesting part is meant to be your feature, not the framework underneath it.',
    ar:
      'الإصدارات أدناه هي الموجودة في ملف package.json الخاص بالمنتج نفسه. والاختيارات مملة عن قصد — فالمُفترض أن يكون المثير هو ميزتك أنت، لا الإطار الذي تحتها.',
  },
  groups: [
    {
      term: { en: 'Front end', ar: 'الواجهة الأمامية' },
      desc: {
        en: 'React 18.3, TypeScript 5.9, Vite 8.2, Tailwind CSS v4.3, React Router 7.18, react-hook-form 7.84 with Zod 4.4 for validation.',
        ar: 'React 18.3، وTypeScript 5.9، وVite 8.2، وTailwind CSS v4.3، وReact Router 7.18، وreact-hook-form 7.84 مع Zod 4.4 للتحقق من المدخلات.',
      },
    },
    {
      term: { en: 'Data and auth', ar: 'البيانات والمصادقة' },
      desc: {
        en: 'Supabase — Postgres with row-level security, Auth, private Storage, and one Edge Function for invitations. supabase-js 2.112.',
        ar: 'Supabase — أي Postgres مع row-level security، وAuth، وStorage خاص، ودالة Edge واحدة للدعوات. وsupabase-js 2.112.',
      },
    },
    {
      term: { en: 'Tests', ar: 'الاختبارات' },
      desc: {
        en: 'Vitest 4.1 for the security suite, Playwright 1.62 for browser smoke tests, and the sweep, which is a plain Node script.',
        ar: 'Vitest 4.1 لمجموعة اختبارات الأمان، وPlaywright 1.62 لاختبارات المتصفح السريعة، والـ sweep، وهو سكربت Node عادي.',
      },
    },
    {
      term: { en: 'Requirements', ar: 'المتطلبات' },
      desc: {
        en: 'Node 20.19 or newer. Docker only for the local stack. A Supabase project — the free tier is enough — for the hosted route.',
        ar: 'Node بإصدار 20.19 أو أحدث. وDocker للبيئة المحلية فقط. ومشروع Supabase — والخطة المجانية تكفي — للمسار المستضاف.',
      },
    },
  ],
  auditNote: {
    en:
      "The product's own production build scores 98 for performance and 100 for accessibility in its captured Lighthouse run. That is the product's number, from its repository — not this page's. This page reports its own separately.",
    ar:
      'بناء الإنتاج الخاص بالمنتج يسجّل 98 في الأداء و100 في إتاحة الوصول في تشغيل Lighthouse المُلتقَط له. هذا رقم المنتج من مستودعه هو — لا رقم هذه الصفحة. وهذه الصفحة تعلن رقمها بشكل منفصل.',
  },
} satisfies {
  eyebrow: Copy
  heading: Copy
  intro: Copy
  groups: readonly CopyPair[]
  auditNote: Copy
}

/* ------------------------------------------------------------- §9 pricing */

export const PRICING = {
  eyebrow: { en: 'Pricing', ar: 'السعر' },
  heading: { en: `One tier. $${PRICE_USD}, paid once.`, ar: `فئة واحدة. ${PRICE_USD} دولارًا، تُدفع مرة واحدة.` },
  priceLabel: { en: 'one-time', ar: 'دفعة واحدة' },
  intro: {
    en:
      'No subscription, no seats, no usage tier. It is source code that runs on infrastructure you own, so there is no service of mine to keep paying for.',
    ar:
      'لا اشتراك، ولا مقاعد، ولا فئات استخدام. هو كود مصدري يعمل على بنية تحتية تملكها أنت، فليست هناك خدمة تخصّني تستمر في الدفع مقابلها.',
  },
  includes: [
    { en: 'The full source: application, 8 migrations, Edge Function, and the theme file you rebrand from.', ar: 'الكود المصدري كاملًا: التطبيق، و8 ملفات migration، ودالة Edge، وملف الثيم الذي تعيد منه العلامة التجارية.' },
    { en: '61 security tests, 9 browser smoke tests, and the guard sweep you can run yourself.', ar: '61 اختبار أمان، و9 اختبارات متصفح سريعة، والـ guard sweep الذي تستطيع تشغيله بنفسك.' },
    { en: 'Five documents: threat model and limits, sweep results, evidence log, deployment, and implementation notes.', ar: 'خمس وثائق: نموذج التهديد والحدود، ونتائج الـ sweep، وسجل الأدلة، والنشر، وملاحظات التنفيذ.' },
    { en: 'A perpetual licence for one application — yours or a client\'s. Modify it freely and keep it closed-source.', ar: 'رخصة دائمة لتطبيق واحد — لك أو لعميلك. عدّله كما تشاء وأبقِه مغلق المصدر.' },
  ],

  /**
   * The value stack, built only from things that were counted. The marketing
   * pattern this replaces stacks estimated hours against the price; that is
   * forbidden here, because the hours are not mine to estimate — so the stack
   * is made of countable artefacts instead, each with the file it came from.
   */
  countsHeading: { en: 'What the number is buying', ar: 'ما الذي يشتريه هذا الرقم' },
  counts: [
    {
      n: '4',
      label: { en: 'tables', ar: 'جداول' },
      note: { en: 'profiles, client_records, attachments, activity_log', ar: 'profiles و client_records و attachments و activity_log' },
    },
    {
      n: '8',
      label: { en: 'migrations', ar: 'ملفات migration' },
      note: { en: '1,324 lines of SQL, counted in supabase/migrations', ar: '1,324 سطر SQL، معدودة في supabase/migrations' },
    },
    {
      n: '61',
      label: { en: 'security tests', ar: 'اختبار أمان' },
      note: { en: 'across 7 files — terminal/test-security.txt', ar: 'موزّعة على 7 ملفات — terminal/test-security.txt' },
    },
    {
      n: '9',
      label: { en: 'browser smoke tests', ar: 'اختبار متصفح سريع' },
      note: { en: 'Playwright, in 3 spec files', ar: 'بـ Playwright، في 3 ملفات' },
    },
    {
      n: '40',
      label: { en: 'guards swept', ar: 'حماية مكسورة عمدًا' },
      note: { en: '37 proven, 3 named — terminal/full-sweep.txt', ar: '37 مُثبَتة، و3 مذكورة بالاسم — terminal/full-sweep.txt' },
    },
    {
      n: '5',
      label: { en: 'documents', ar: 'وثائق' },
      note: { en: 'threat model, sweep results, evidence, deployment, notes', ar: 'نموذج التهديد، نتائج الـ sweep، الأدلة، النشر، الملاحظات' },
    },
  ],
  countsNote: {
    en: 'Every figure above was counted in the repository or read off a run that completed, and the file is named beside it. There is no estimate here of hours saved or money made, because those are numbers about your work, not mine, and I have no way to measure them.',
    ar: 'كل رقم بالأعلى إما معدود داخل المستودع أو مقروء من تشغيل اكتمل، والملف مذكور بجانبه. ولا يوجد هنا تقدير لساعات موفَّرة ولا لمال مكتسب، لأن تلك أرقام عن عملك أنت لا عن عملي، ولا أملك طريقة لقياسها.',
  },
  licenceNote: {
    en:
      'One application per licence; a second application needs a second licence. The licence does not permit reselling or republishing the template itself, or using it to build a competing starter kit.',
    ar:
      'تطبيق واحد لكل رخصة؛ والتطبيق الثاني يحتاج رخصة ثانية. ولا تسمح الرخصة بإعادة بيع القالب نفسه أو نشره، ولا باستخدامه لبناء قالب منافس.',
  },
  guaranteeHeading: { en: 'The guarantee, in full', ar: 'الضمان كاملًا' },
} satisfies {
  eyebrow: Copy
  heading: Copy
  priceLabel: Copy
  intro: Copy
  includes: readonly Copy[]
  countsHeading: Copy
  counts: readonly Counted[]
  countsNote: Copy
  licenceNote: Copy
  guaranteeHeading: Copy
}

/* ------------------------------------------------------------ proof block */

export const PROOF = {
  heading: { en: 'Instead of testimonials', ar: 'بدلًا من آراء العملاء' },
  body: {
    en: [
      'This product has no customers yet, so there is nothing honest to quote. What there is instead is output from runs that completed, and every number on this page points at one of these files.',
      'Before you buy, you read them. After you buy, you run them yourself — that is what the guarantee is for. Running the sweep needs the repository, Docker and a local Supabase, so it is not something you can do from this page, and saying otherwise would be the first false claim here.',
    ],
    ar: [
      'هذا المنتج ليس له عملاء بعد، فلا يوجد اقتباس صادق يمكن عرضه. والموجود بدلًا من ذلك مخرجات تشغيلات اكتملت، وكل رقم في هذه الصفحة يشير إلى أحد هذه الملفات.',
      'قبل الشراء، تقرأها. وبعد الشراء، تشغّلها بنفسك — ولهذا وُجد الضمان. وتشغيل الـ sweep يحتاج المستودع وDocker وSupabase محليًا، فهو ليس شيئًا تفعله من هذه الصفحة، والقول بغير ذلك سيكون أول ادّعاء كاذب هنا.',
    ],
  },
  openLabel: { en: 'Open the file', ar: 'افتح الملف' },
  jumpLabel: { en: 'Jump to it', ar: 'انتقل إليه' },
  items: [
    {
      href: RUNS.fullSweep,
      external: true,
      term: { en: 'The full guard sweep', ar: 'الـ guard sweep كاملًا' },
      desc: {
        en: '40 guards broken one at a time and restored, with the tests that turned red for each. Baseline 61 tests. Source of 40, 37 and 3.',
        ar: '40 حماية تُكسر واحدة تلو الأخرى ثم تُستعاد، ومعها الاختبارات التي صارت حمراء لكل منها. الأساس 61 اختبارًا. وهو مصدر الأرقام 40 و37 و3.',
      },
    },
    {
      href: RUNS.securitySuite,
      external: true,
      term: { en: 'The security suite', ar: 'مجموعة اختبارات الأمان' },
      desc: {
        en: '7 files, 61 tests, all passing, with the run duration. Source of the number 61.',
        ar: '7 ملفات، و61 اختبارًا، كلها ناجحة، مع مدة التشغيل. وهو مصدر الرقم 61.',
      },
    },
    {
      href: RUNS.filteredSweep,
      external: true,
      term: { en: 'One guard, broken and restored', ar: 'حماية واحدة، تُكسر وتُستعاد' },
      desc: {
        en: 'The shortest version of the whole argument: one protection dropped, one named test turns red, the protection goes back, 61/61 again.',
        ar: 'أقصر صيغة للحجّة كلها: حماية واحدة تُسقَط، فيحمرّ اختبار محدد بالاسم، ثم تعود الحماية، فترجع 61/61.',
      },
    },
    {
      href: '#walkthrough',
      external: false,
      term: { en: 'The recorded walkthrough', ar: 'الجولة المسجَّلة' },
      desc: {
        en: 'The application driven end to end, admin side and client side, no edits and no narration.',
        ar: 'التطبيق يُستخدَم من أوله إلى آخره، من جهة المشرف ومن جهة العميل، بلا مونتاج وبلا تعليق صوتي.',
      },
    },
    {
      href: '#enforcement',
      external: false,
      term: { en: 'The two-identity screenshots', ar: 'صورتا الهويّتين' },
      desc: {
        en: 'A real browser window with the address bar visible, photographed by hand rather than captured by a script that could have drawn it.',
        ar: 'نافذة متصفح حقيقية بشريط عنوان ظاهر، مصوَّرة يدويًا لا مُلتقَطة بسكربت كان بإمكانه رسمها.',
      },
    },
  ],
} satisfies {
  heading: Copy
  body: CopyList
  openLabel: Copy
  jumpLabel: Copy
  items: readonly (CopyPair & { readonly href: string; readonly external: boolean })[]
}

/* -------------------------------------------------------------------- FAQ */

export const FAQ = {
  heading: { en: 'Questions', ar: 'أسئلة' },
  items: [
    {
      term: { en: 'What licence is it, exactly?', ar: 'ما نوع الرخصة بالضبط؟' },
      desc: {
        en: 'A perpetual commercial licence for one application. You may modify anything, keep it closed-source, and ship it inside your own product. You may not resell or republish the template itself, or use it to build a competing starter kit. A second application needs a second licence.',
        ar: 'رخصة تجارية دائمة لتطبيق واحد. يمكنك تعديل أي شيء، وإبقاؤه مغلق المصدر، وشحنه داخل منتجك. ولا يجوز إعادة بيع القالب نفسه أو نشره، ولا استخدامه لبناء قالب منافس. والتطبيق الثاني يحتاج رخصة ثانية.',
      },
    },
    {
      term: { en: 'Can I use it for client work?', ar: 'هل أستخدمه في عمل لعميل؟' },
      desc: {
        en: 'Yes. The licence covers one application built for yourself or for a client. Two client projects means two licences.',
        ar: 'نعم. الرخصة تغطي تطبيقًا واحدًا تبنيه لنفسك أو لعميل. ومشروعان لعميلين يعنيان رخصتين.',
      },
    },
    {
      term: { en: 'Do I get updates?', ar: 'هل أحصل على تحديثات؟' },
      desc: {
        en: 'Yes, and they are covered. Your licence includes any update supplied to you at no additional cost, so you never pay twice for the same application. What I will not do is publish a release schedule I cannot hold to — so buy this for what it does today, and treat updates as something included when they ship rather than something you are paying for now.',
        ar: 'نعم، وهي مشمولة. رخصتك تغطي أي تحديث يُسلَّم إليك دون تكلفة إضافية، فلا تدفع مرتين عن التطبيق نفسه. لكنني لن أنشر جدول إصدارات لا أستطيع الالتزام به — فاشترِ المنتج بما يقدّمه اليوم، واعتبر التحديثات مشمولة حين تصدر، لا جزءًا مما تدفع مقابله الآن.',
      },
    },
    {
      term: { en: "What if I need a feature that isn't included?", ar: 'وماذا لو احتجت ميزة غير موجودة؟' },
      desc: {
        en: 'You build it — it is source code, and the licence lets you change anything. The limits section above names what is absent so you can price that work before you buy rather than after. The documentation includes walkthroughs for the two changes most people make: renaming the records table, and adding a third role.',
        ar: 'تبنيها بنفسك — فهو كود مصدري، والرخصة تتيح لك تغيير أي شيء. وقسم الحدود أعلاه يسمّي ما هو غائب لتقدّر تكلفة ذلك العمل قبل الشراء لا بعده. ويتضمن التوثيق شرحين للتغييرين الأكثر شيوعًا: إعادة تسمية جدول السجلات، وإضافة دور ثالث.',
      },
    },
    {
      term: { en: 'Why no subscription?', ar: 'لماذا لا يوجد اشتراك؟' },
      desc: {
        en: 'Because there is nothing to subscribe to. You get files, and they run on your Supabase project and your hosting. There is no server of mine in the path, so a recurring charge would be rent for something you already own.',
        ar: 'لأنه لا يوجد ما تشترك فيه. أنت تحصل على ملفات، وهي تعمل على مشروع Supabase الخاص بك واستضافتك أنت. ولا يوجد خادم لي في المسار، فالرسم المتكرر سيكون إيجارًا لشيء تملكه بالفعل.',
      },
    },
    {
      term: { en: 'What exactly does the guarantee cover?', ar: 'ما الذي يغطيه الضمان بالضبط؟' },
      desc: {
        en: 'One specific thing, testable by you: that the protections the documentation calls proven really do have a test that fails when they are broken. Run the sweep. If a protection listed as proven turns out to have no test catching it, you get a full refund within 14 days. It is not a general "changed my mind" guarantee, and it deliberately does not cover the three protections the documentation already names as untested — those are disclosed, not hidden.',
        ar: 'شيء واحد محدد، وقابل لاختبارك أنت: أن الحمايات التي يسمّيها التوثيق «مُثبَتة» لها فعلًا اختبار يفشل عند كسرها. شغّل الـ sweep. وإذا تبيّن أن حماية مُدرجة كمُثبَتة ليس لها اختبار يكشفها، تسترد كامل المبلغ خلال 14 يومًا. وهو ليس ضمان «غيّرت رأيي» العام، ولا يغطي عمدًا الحمايات الثلاث التي يسمّيها التوثيق أصلًا غير مُختبَرة — فتلك معلَنة لا مخفيّة.',
      },
    },
    {
      term: { en: 'Is there a live demo?', ar: 'هل توجد نسخة تجريبية مباشرة؟' },
      desc: {
        en: 'No. Everything on this page is a recording or a screenshot of the application running locally against a real database — there is no hosted demo you can sign into, and there is no link here that pretends otherwise.',
        ar: 'لا. كل ما في هذه الصفحة تسجيل أو لقطة شاشة للتطبيق وهو يعمل محليًا على قاعدة بيانات حقيقية — لا توجد نسخة مستضافة تسجّل الدخول إليها، ولا يوجد رابط هنا يوحي بغير ذلك.',
      },
    },
  ],
} satisfies { heading: Copy; items: readonly CopyPair[] }

/* --------------------------------------------------------- email + footer */

export const CONTACT = {
  heading: { en: 'Not ready to buy?', ar: 'لست مستعدًا للشراء؟' },
  body: {
    en: 'Email me. Questions about the licence, the limits, or anything you read on this page — I would rather answer before you buy than after.',
    ar: 'راسلني. أي سؤال عن الرخصة أو الحدود أو أي شيء قرأته في هذه الصفحة — أن أجيب قبل الشراء أفضل من أن أجيب بعده.',
  },
  ariaPrefix: { en: 'Email', ar: 'راسل' },
} satisfies Record<string, Copy>

export const SIGNUP = {
  heading: { en: 'Or leave an address', ar: 'أو اترك بريدك' },
  body: {
    en: 'One line when the sweep results change or the template does. No sequence, no newsletter, and it is one click to stop.',
    ar: 'سطر واحد حين تتغيّر نتائج الـ sweep أو يتغيّر القالب. لا سلسلة رسائل ولا نشرة بريدية، وإيقافه بنقرة واحدة.',
  },
  label: { en: 'Email address', ar: 'البريد الإلكتروني' },
  placeholder: { en: 'you@example.com', ar: 'you@example.com' },
  submit: { en: 'Add me', ar: 'أضِفني' },
  sending: { en: 'Sending…', ar: 'جارٍ الإرسال…' },
  ok: { en: 'Saved. That is the only thing stored.', ar: 'تم الحفظ. وهذا كل ما يُخزَّن.' },
  invalid: { en: 'That address does not look right.', ar: 'هذا البريد لا يبدو صحيحًا.' },
  failed: {
    en: 'That did not send, and nothing was stored. Try again, or email me directly above.',
    ar: 'لم يُرسَل، ولم يُحفَظ شيء. أعد المحاولة، أو راسلني مباشرة بالأعلى.',
  },
} satisfies Record<string, Copy>

export const FOOTER = {
  note: {
    en: 'Every number on this page comes from a run that completed, in a file named beside it.',
    ar: 'كل رقم في هذه الصفحة يأتي من تشغيل اكتمل، وفي ملف مذكور بجانبه.',
  },
  legalHeading: { en: 'The terms, in short', ar: 'الشروط باختصار' },
  /**
   * Stated outright rather than hidden behind links to pages that do not exist.
   * The privacy paragraph describes this page's measured behaviour: no cookies,
   * no third-party requests, one localStorage key holding the chosen language.
   */
  legal: [
    {
      term: { en: 'Refunds', ar: 'الاسترداد' },
      desc: {
        en: 'The guarantee above is my own promise: run the guard sweep, and if a protection documented as proven has no test catching it, full refund within 14 days. Payment is handled by Lemon Squeezy at checkout, under their terms and refund handling.',
        ar: 'الضمان أعلاه وعدٌ مني أنا: شغّل الـ guard sweep، وإذا كانت حماية موثّقة على أنها مُثبَتة ليس لها اختبار يكشفها، فاسترداد كامل خلال 14 يومًا. أما الدفع نفسه فتتولاه Lemon Squeezy عند إتمام الشراء، وفق شروطها وآلية الاسترداد لديها.',
      },
    },
    {
      term: { en: 'Licence', ar: 'الرخصة' },
      desc: {
        en: 'One application per licence, perpetual, modify it freely, no redistribution. The full text ships with the product.',
        ar: 'تطبيق واحد لكل رخصة، دائمة، عدّلها كما تشاء، ولا يُعاد توزيعها. والنص الكامل يأتي مع المنتج.',
      },
    },
    {
      term: { en: 'Privacy', ar: 'الخصوصية' },
      desc: {
        en: 'This page sets no cookies, runs no analytics, and stores exactly one thing in your browser: which language you chose. Nothing is sent anywhere unless you type an address into the form below and submit it — that address goes to my own database and is stored on its own, with no name, no IP and nothing else attached. Payment and billing data are handled by Lemon Squeezy under their own privacy policy.',
        ar: 'هذه الصفحة لا تضع أي كوكيز، ولا تُشغّل أي تحليلات، وتخزّن في متصفحك شيئًا واحدًا فقط: اللغة التي اخترتها. ولا يُرسَل أي شيء إلى أي مكان إلا إذا كتبت بريدك في النموذج بالأسفل وأرسلته — عندها يذهب البريد إلى قاعدة بياناتي أنا، ويُحفَظ وحده، بلا اسم ولا عنوان IP ولا أي شيء آخر. أما بيانات الدفع والفوترة فتتولاها Lemon Squeezy وفق سياسة الخصوصية الخاصة بها.',
      },
    },
  ],
} satisfies { note: Copy; legalHeading: Copy; legal: readonly CopyPair[] }
