function ComponentTestPage() {
  return (
    <div>
      <main className="px-6 max-w-8xl mx-auto space-y-16">
        {/* Breadcrumbs */}
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Design</a>
            </li>
            <li>Component Test</li>
          </ul>
        </div>

        {/* Hero / Typography */}
        <section className="space-y-6">
          <h1 className="font-display text-3xl uppercase">
            ANKI CALLED. IT WANTS ITS USERS BACK.
          </h1>
          <h1 className="font-display text-3xl uppercase">
            ANKI CALLED. IT WANTS ITS USERS BACK.
          </h1>
          <h2 className="font-display text-3xl">Font &amp; Theme Reference</h2>
          <p className="font-sans max-w-2xl text-base-content/80">
            This page brings together a wide variety of daisyUI components so
            you can tune colors, radii, spacing, and fonts in one place. Every
            section below uses the active theme&apos;s semantic colors, so
            switching themes updates the whole page.
          </p>
          <p className="font-sans max-w-2xl text-base-content/80">
            This paragraph uses the second sans font, useful for comparing body
            copy candidates side by side against the paragraph above.
          </p>

          <div className="divider">Headings</div>

          <div className="space-y-2">
            <h1 className="text-4xl">Heading One</h1>
            <h2 className="text-3xl">Heading Two</h2>
            <h3 className="text-2xl">Heading Three</h3>
            <h4 className="text-xl">Heading Four</h4>
            <h5 className="text-lg">Heading Five</h5>
            <h6 className="text-base">Heading Six</h6>
          </div>
        </section>

        {/* Fluid Typography */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display">Fluid Typography</h2>
          <p className="text-base-content/80 max-w-2xl">
            Each step interpolates between its min and max size across a
            375px&ndash;1536px viewport. Resize the browser window (or zoom) to
            see it scale.
          </p>
          <div className="space-y-4">
            {[
              {
                name: '--text-2xs',
                className: 'text-2xs',
                range: '10px – 12px',
              },
              { name: '--text-xs', className: 'text-xs', range: '12px – 14px' },
              { name: '--text-s', className: 'text-s', range: '12px – 16px' },
              { name: '--text-m', className: 'text-m', range: '16px – 24px' },
              { name: '--text-l', className: 'text-l', range: '24px – 40px' },
              { name: '--text-xl', className: 'text-xl', range: '32px – 56px' },
              {
                name: '--text-2xl',
                className: 'text-2xl',
                range: '48px – 80px',
              },
              {
                name: '--text-3xl',
                className: 'text-3xl',
                range: '65px – 120px',
              },
              {
                name: '--text-4xl',
                className: 'text-4xl',
                range: '88px – 144px',
              },
              {
                name: '--text-5xl',
                className: 'text-5xl',
                range: '112px – 184px',
              },
              {
                name: '--text-6xl',
                className: 'text-6xl',
                range: '140px – 232px',
              },
              {
                name: '--text-7xl',
                className: 'text-7xl',
                range: '168px – 288px',
              },
              {
                name: '--text-8xl',
                className: 'text-8xl',
                range: '208px – 360px',
              },
            ].map((step) => (
              <div
                key={step.name}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="badge badge-ghost badge-sm font-mono shrink-0">
                  {step.name}
                </span>
                <span className="text-xs text-base-content/60 shrink-0">
                  {step.range}
                </span>
                <p className={`w-full ${step.className}`}>
                  The quick brown fox jumps over the lazy dog.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display">Buttons</h2>
          <div className="flex flex-wrap gap-2">
            <button className="btn">Default</button>
            <button className="btn btn-neutral">Neutral</button>
            <button className="btn btn-primary shadow-sm">Primary</button>
            <button className="btn btn-secondary shadow-md">Secondary</button>
            <button className="btn btn-accent shadow-lg">Accent</button>
            <button className="btn btn-info">Info</button>
            <button className="btn btn-success">Success</button>
            <button className="btn btn-warning">Warning</button>
            <button className="btn btn-error">Error</button>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="btn btn-outline">Outline</button>
            <button className="btn btn-dash">Dash</button>
            <button className="btn btn-soft">Soft</button>
            <button className="btn btn-ghost">Ghost</button>
            <button className="btn btn-link">Link</button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button className="btn btn-xs">Extra Small</button>
            <button className="btn btn-sm">Small</button>
            <button className="btn btn-md">Medium</button>
            <button className="btn btn-lg">Large</button>
            <button className="btn btn-xl">Extra Large</button>
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display">Badges</h2>
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge">Default</span>
            <span className="badge badge-neutral">Neutral</span>
            <span className="badge badge-primary">Primary</span>
            <span className="badge badge-secondary">Secondary</span>
            <span className="badge badge-accent">Accent</span>
            <span className="badge badge-info">Info</span>
            <span className="badge badge-success">Success</span>
            <span className="badge badge-warning">Warning</span>
            <span className="badge badge-error">Error</span>
            <span className="badge badge-outline">Outline</span>
            <span className="badge badge-soft">Soft</span>
          </div>
        </section>

        {/* Alerts */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display">Alerts</h2>
          <div className="space-y-2">
            <div role="alert" className="alert alert-info">
              <span>New updates are available for your theme.</span>
            </div>
            <div role="alert" className="alert alert-success">
              <span>Your changes have been saved successfully.</span>
            </div>
            <div role="alert" className="alert alert-warning">
              <span>This action may affect existing components.</span>
            </div>
            <div role="alert" className="alert alert-error">
              <span>Something went wrong. Please try again.</span>
            </div>
          </div>
        </section>

        {/* Form elements */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display">Form Elements</h2>
          <fieldset className="fieldset bg-base-200 border border-base-300 rounded-box p-6 max-w-xl">
            <legend className="fieldset-legend">Profile</legend>

            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Ada Lovelace"
              className="input w-full"
            />

            <label className="label" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              className="textarea w-full"
              placeholder="Tell us about yourself"></textarea>

            <label className="label" htmlFor="role">
              Role
            </label>
            <select id="role" className="select w-full" defaultValue="Designer">
              <option disabled>Pick a role</option>
              <option>Designer</option>
              <option>Engineer</option>
              <option>Product Manager</option>
            </select>

            <label className="label mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-primary"
              />
              Email me updates
            </label>

            <div className="mt-2 flex flex-wrap gap-4">
              <label className="label flex items-center gap-2">
                <input
                  type="radio"
                  name="plan"
                  className="radio radio-primary"
                  defaultChecked
                />
                Free
              </label>
              <label className="label flex items-center gap-2">
                <input
                  type="radio"
                  name="plan"
                  className="radio radio-primary"
                />
                Pro
              </label>
              <label className="label flex items-center gap-2">
                <input
                  type="radio"
                  name="plan"
                  className="radio radio-primary"
                />
                Team
              </label>
            </div>

            <label className="label mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="toggle toggle-primary"
              />
              Enable notifications
            </label>

            <label className="label mt-4" htmlFor="volume">
              Volume
            </label>
            <input
              id="volume"
              type="range"
              min={0}
              max={100}
              defaultValue={40}
              className="range range-primary"
            />

            <label className="label mt-4">Rating</label>
            <div className="rating">
              <input type="radio" name="rating-1" className="rating-hidden" />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star"
                aria-label="1 star"
              />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star"
                aria-label="2 star"
                defaultChecked
              />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star"
                aria-label="3 star"
              />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star"
                aria-label="4 star"
              />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star"
                aria-label="5 star"
              />
            </div>

            <button className="btn btn-primary mt-6">Save Profile</button>
          </fieldset>
        </section>

        {/* Shadows */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display">Shadows</h2>
          <p className="text-base-content/80">
            Custom <code>shadow-sm</code>, <code>shadow-md</code>, and{' '}
            <code>shadow-lg</code> values scoped to the mnemiq themes. Other
            daisyUI themes keep Tailwind&apos;s default soft shadows.
          </p>
          <div className="flex flex-wrap gap-8">
            <div className="bg-base-100 border border-base-300 p-6 shadow-sm">
              shadow-sm
            </div>
            <div className="bg-base-100 border border-base-300 p-6 shadow-md">
              shadow-md
            </div>
            <div className="bg-base-100 border border-base-300 p-6 shadow-lg">
              shadow-lg
            </div>
          </div>
        </section>

        {/* Data display: cards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display">Cards</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card bg-base-100 border border-base-300">
              <figure>
                <img src="https://picsum.photos/400/200" alt="Placeholder" />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Card Title</h3>
                <p>
                  A short description of this card&apos;s content goes here.
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">Action</button>
                </div>
              </div>
            </div>
            <div className="card card-border bg-base-100">
              <div className="card-body">
                <h3 className="card-title">
                  Plan
                  <span className="badge badge-secondary">New</span>
                </h3>
                <p>A borderless card variant with a badge in the title.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-outline btn-sm">Learn more</button>
                </div>
              </div>
            </div>
            <div className="card bg-neutral text-neutral-content">
              <div className="card-body">
                <h3 className="card-title">Neutral Card</h3>
                <p>Useful for checking contrast against neutral surfaces.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Avatars & Stats */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display">Avatars &amp; Stats</h2>
          <div className="flex flex-wrap items-center gap-6">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img src="https://picsum.photos/id/64/200" alt="Avatar" />
              </div>
            </div>
            <div className="avatar avatar-online">
              <div className="w-16 rounded-full">
                <img
                  src="https://picsum.photos/id/65/200"
                  alt="Avatar online"
                />
              </div>
            </div>
            <div className="avatar-group -space-x-4">
              <div className="avatar">
                <div className="w-12">
                  <img
                    src="https://picsum.photos/id/66/200"
                    alt="Avatar group"
                  />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img
                    src="https://picsum.photos/id/67/200"
                    alt="Avatar group"
                  />
                </div>
              </div>
              <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-12">
                  <span>+3</span>
                </div>
              </div>
            </div>
          </div>

          <div className="stats bg-base-200 border border-base-300 shadow">
            <div className="stat">
              <div className="stat-title">Total Views</div>
              <div className="stat-value">89,400</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
            <div className="stat">
              <div className="stat-title">Active Users</div>
              <div className="stat-value">4,200</div>
              <div className="stat-desc">↗ 12 new today</div>
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display">Table</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Ada Lovelace</td>
                  <td>Engineer</td>
                  <td>
                    <span className="badge badge-success badge-sm">Active</span>
                  </td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>Grace Hopper</td>
                  <td>Designer</td>
                  <td>
                    <span className="badge badge-warning badge-sm">
                      Pending
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>Alan Turing</td>
                  <td>Product</td>
                  <td>
                    <span className="badge badge-error badge-sm">Inactive</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Navigation */}
        <section className="space-y-6">
          <h2 className="text-2xl font-display">Navigation</h2>

          <div role="tablist" className="tabs tabs-lift">
            <input
              type="radio"
              name="my_tabs"
              role="tab"
              className="tab"
              aria-label="Overview"
              defaultChecked
            />
            <div role="tabpanel" className="tab-content p-4">
              Overview content lives here.
            </div>

            <input
              type="radio"
              name="my_tabs"
              role="tab"
              className="tab"
              aria-label="Details"
            />
            <div role="tabpanel" className="tab-content p-4">
              Details content lives here.
            </div>

            <input
              type="radio"
              name="my_tabs"
              role="tab"
              className="tab"
              aria-label="Settings"
            />
            <div role="tabpanel" className="tab-content p-4">
              Settings content lives here.
            </div>
          </div>

          <ul className="menu bg-base-200 border border-base-300 rounded-box w-56">
            <li className="menu-title">Workspace</li>
            <li>
              <a>Dashboard</a>
            </li>
            <li>
              <a className="menu-active">Projects</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
          </ul>

          <details className="dropdown">
            <summary className="btn">Open Dropdown</summary>
            <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow border border-base-300">
              <li>
                <a>Item One</a>
              </li>
              <li>
                <a>Item Two</a>
              </li>
            </ul>
          </details>

          <ul className="steps">
            <li className="step step-primary">Register</li>
            <li className="step step-primary">Choose plan</li>
            <li className="step">Purchase</li>
            <li className="step">Receive product</li>
          </ul>

          <div className="join">
            <button className="join-item btn">1</button>
            <button className="join-item btn btn-active">2</button>
            <button className="join-item btn">3</button>
            <button className="join-item btn">4</button>
          </div>
        </section>

        {/* Feedback & misc */}
        <section className="space-y-6">
          <h2 className="text-2xl font-display">Feedback &amp; Misc</h2>

          <div className="space-y-2 max-w-md">
            <progress className="progress" value={20} max={100}></progress>
            <progress
              className="progress progress-primary"
              value={40}
              max={100}></progress>
            <progress
              className="progress progress-secondary"
              value={60}
              max={100}></progress>
            <progress
              className="progress progress-accent"
              value={80}
              max={100}></progress>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="loading loading-spinner loading-md"></span>
            <span className="loading loading-dots loading-md"></span>
            <span className="loading loading-ring loading-md"></span>
            <span className="loading loading-bars loading-md"></span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="tooltip" data-tip="This is a tooltip">
              <button className="btn">Hover me</button>
            </div>
            <p>
              Press <kbd className="kbd kbd-sm">Ctrl</kbd> +{' '}
              <kbd className="kbd kbd-sm">K</kbd> to search.
            </p>
          </div>

          <div className="collapse collapse-arrow bg-base-200 border border-base-300 max-w-xl">
            <input type="checkbox" />
            <div className="collapse-title font-medium">Click to expand</div>
            <div className="collapse-content text-sm">
              Collapse content is useful for FAQs and progressive disclosure.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ComponentTestPage;
